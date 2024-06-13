import NextAuth, { type DefaultSession } from "next-auth"
import authOptions from "./auth.config";
import { getUserById } from "./actions/getUserByEmail";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./app/(lib)/(database)/database";

// declare module "@auth/core" {
//   interface Session {
//     user: {
//       role?: "ADMIN" | "USER"
//     } & DefaultSession["user"]
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  //if not used then the registratin through the providers won't work and the user won't get added in our db
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/error"
  },
  //use to mark the emails registered by the oauth since the google and github do email verification 
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        }
      })
    }
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      // console.log({ jwtToken: token });

      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;
      token.role = user?.role || "";

      return token;
    },

    async session({ token, session }) {
      // console.log({ sessionToken: token });
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (!token.role) return session;

      //@ts-ignore
      session.user.role = token.role;

      // console.log({ sessionSession: session });
      return session;
    }
  },
  ...authOptions,
})
