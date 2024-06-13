import prisma from "@/app/(lib)/(database)/database"

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await prisma.verficationToken.findFirst({
      where: { email },
    })

    if (!verficationToken) return null;

    return verficationToken;

  } catch {
    return null;
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verficationToken = await prisma.verficationToken.findUnique({
      where: { token },
    })

    if (!verficationToken) return null;

    return verficationToken;

  } catch {
    return null;
  }
}
