"use server"
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import z from "zod";

const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  // console.log(values);
  /**
   * even though we have zod validation in frontned we are again doing this here because if the user can sent values not just from the 
   * frontend can also use postman thus we use this here 
   * */
  const response = LoginSchema.safeParse(values);

  if (!response.success) {
    return { message: "Invalid fields", success: null };
  }

  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password
    });
    console.log("from loginAction");
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "InValid Password", success: null }
        case "CallbackRouteError":
          return { message: "Invalid Credentials", success: null }
        default:
          return { message: "Something Went wrong1", success: null }
      }
    }
    //throw the erro or it will not redirect to back to the dashboard page
    // throw error
    // return { message: "Something Went Wrong", success: null }
  }
  return { message: "", success: null };
}

export default loginAction;
