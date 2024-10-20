import prisma from "@/app/(lib)/(database)/database";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    return user;
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      }
    })
    return user;
  } catch (error) {
    return null;
  }
}
