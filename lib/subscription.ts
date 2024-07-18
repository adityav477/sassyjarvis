"use server"
import { auth } from "@/auth";
import prisma from "@/app/(lib)/(database)/database";

export const checkSubscription = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("subscription 1 ");
    return { isPro: false, expiry: null };
  }
  const userId = session?.user?.id;
  console.log("userId in subscription lib is ", userId);

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionEndDate: true,
      stripePriceId: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  })

  // console.log("user Subscription is ", userSubscription);

  if (!userSubscription?.stripeSubscriptionEndDate || !userSubscription.stripePriceId) {
    console.log("subscription 2");
    return { isPro: false, expiry: null }
  }

  const isValid = userSubscription.stripePriceId && userSubscription?.stripeSubscriptionEndDate?.getTime() > Date.now();

  if (isValid) {
    console.log("subscription 3");
    return { isPro: true, expiry: userSubscription?.stripeSubscriptionEndDate };
  }

  console.log("subscription 4");
  return { isPro: false, expiry: null }
}
