"use server"
import { auth } from "@/auth";
import prisma from "@/app/(lib)/(database)/database";
import { MAX_API_LIMIT } from "@/actions/constants";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

type checkLimitType = {
  plan: boolean;
  leftGenerations: number | null;
  response?: NextResponse;
}

export const checkLimit = async (): Promise<checkLimitType> => {
  const session = await auth();

  if (!session?.user?.id) {
    return { plan: false, leftGenerations: null, response: new NextResponse("User doesn't exists", { status: 411 }) };
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  // console.log("user is ", user);

  if (user?.role === UserRole.UPGRADED) {
    return { plan: true, leftGenerations: null };
  } else if (user?.role == UserRole.FREE) {

    const freeGenerationsLeft = await prisma.userApiLimit.findUnique({
      where: {
        userId,
      },
      select: {
        count: true,
      }
    })
    console.log("free count is ", freeGenerationsLeft);


    if (!freeGenerationsLeft) {
      const newUserApiLimit = await prisma.userApiLimit.create({
        data: {
          userId: userId,
          count: 3,
        }
      })
      console.log(newUserApiLimit);
      return { plan: false, leftGenerations: newUserApiLimit.count };

    } else if (freeGenerationsLeft?.count <= MAX_API_LIMIT && freeGenerationsLeft?.count > 0) {
      return { plan: false, leftGenerations: freeGenerationsLeft?.count };
    } else {
      return { plan: false, leftGenerations: 0 };
    }
  }

  //default return 
  return { plan: false, leftGenerations: null };
}

export const increaseFreeLimit = async () => {

  const session = await auth();

  if (!session?.user) {
    return new NextResponse("User doesn't exists", { status: 411 });
  }

  const userId = session.user.id;

  const user = await prisma.userApiLimit.update({
    where: {
      userId: userId,
    },
    data: {
      count: {
        increment: -1,
      }
    }
  })
}

export const upgradeRole = async () => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("User doesn't exists", { status: 411 });
  }

  const userId = session.user.id;

  const user = await prisma.user.updateMany({
    where: {
      id: userId,
    },
    data: {
      role: UserRole.UPGRADED,
    }
  })
}

