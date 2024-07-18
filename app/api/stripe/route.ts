import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/app/(lib)/(database)/database";
import { absolutePath } from "@/lib/utils";

const returnURL = absolutePath({ url: "/settings" });
// console.log("return url is ",returnURL);

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("User Not found Login", { status: 411 });
    }

    const userId = session?.user?.id;
    const userEmail = session.user.email!;

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: userId,
      }
    })

    //when the user subscription already exists then we send them to billing portan 
    if (userSubscription && userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: returnURL
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: returnURL,
      cancel_url: returnURL,
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Sassy Jarvis",
              description: 'Allows Different Generations from API',
            },
            unit_amount: 100,
            recurring: {
              interval: "month",
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      }
    })

    return new NextResponse(JSON.stringify({url: stripeSession.url}));

  } catch (error) {
    console.log(error);
    return new NextResponse("Error in /api/route",{status: 404});
  }
}


