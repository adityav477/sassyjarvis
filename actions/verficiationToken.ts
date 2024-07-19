import prisma from "@/app/(lib)/(database)/database"

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await prisma.verificationToken.findFirst({
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
    const verficationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verficationToken) return null;

    return verficationToken;

  } catch {
    return null;
  }
}
