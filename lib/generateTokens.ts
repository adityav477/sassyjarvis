import prisma from "@/app/(lib)/(database)/database";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/actions/verficiationToken";

export const generateVerficationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 300 * 1000); //takes the current time and adds 5 mins of it to expiry time

  // check for previously stored token and delete them and then save this new token 
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return verificationToken;
}
