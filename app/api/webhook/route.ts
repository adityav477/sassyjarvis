import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/app/(lib)/(database)/database";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
    // console.log("Event in webhook Created");
  } catch (error: any) {
    return new NextResponse(`WebHook Error ${error}`, { status: 402 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    // console.log("inside checkout.session in webhook");


    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // console.log("userId in webhookStripe is ", session?.metadata?.userId);

    // await prisma.$transaction([
    await prisma.userSubscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionEndDate: new Date(
          subscription.current_period_end * 1000
        )
      }
    })

    await prisma.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        role: "UPGRADED",
      }
    })

    // ])

  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // console.log("inside checkout.session in webhook");
    // console.log("subscription.id is ", subscription.id);

    const updatedSubscription = await prisma.userSubscription.update({
      where: {
        stripeCustomerId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeSubscriptionEndDate: new Date(
          subscription.current_period_end * 1000
        ),
      }
    })

    if (updatedSubscription?.userId) {
      await prisma.user.update({
        where: {
          id: updatedSubscription?.userId
        },
        data: {
          role: "UPGRADED",
        }
      })
    }
  }

  return new NextResponse(null, { status: 200 });
}
