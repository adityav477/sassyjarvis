import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./actions/getUserByEmail";
import bcryptjs from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentaislProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default  {
  providers: [
    Github({
       clientId: process.env.AUTH_GITHUB_CLIENT,
       clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    CredentaislProvider({
      // name: "credentials",
      // credentials: {
      //   email: {label: "Email",type: "text"},
      //   password: {label: "Password", type:"password"}
      // },

      authorize: async (credentials) => {
        const validation = LoginSchema.safeParse(credentials);
        if(validation.success){
          const {email,password} = validation.data;

          try {
            const user = await getUserByEmail(email);
            //if the user has registerd through gmail then he won't have password field so he can't 
            //login through credentials and needs to do so through google provider
            if(!user || !user.password){
              return null;
            }

            const correctPassword = await bcryptjs.compare(password,user.password);

            if(!correctPassword) return null;
            return user;
          } catch (error) {
            console.log("Error while finding the user",error);
            return null
          }
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig
