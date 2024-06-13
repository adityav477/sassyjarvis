"use server"
import { RegistrationSchema } from "@/schemas";
import z from "zod";
import prisma from "@/app/(lib)/(database)/database";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "./getUserByEmail";
import { generateVerficationToken } from "@/lib/generateTokens";

const registrationAction = async (values: z.infer<typeof RegistrationSchema>) => {
  console.log(values);
  //validate the data received from the frontend 
  const validate = RegistrationSchema.safeParse(values);

  if (!validate.success) {
    return { message: "Invalid fields", success: null };
  }

  const { email, password, name } = validate.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  //check the existing user 
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { message: "User Already Exists", success: null }
  }

  //create the new user 
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    }
  })

  //generate and save the token for the created user 
  const verificationToken = await generateVerficationToken(newUser.email);

  // TODO; Send the email
  return { message: "User Created", success: 1 }

}

export default registrationAction;
