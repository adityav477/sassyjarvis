import authOptions from "./auth.config";
import NextAuth from "next-auth";
import { publicRoutes, apiAuthRoutePrefix, authRoutes, afterLoginDefaultPage } from "./actions/routes";


const { auth } = NextAuth(authOptions);

// @ts-ignore
export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  console.log("route: ", req.nextUrl.pathname);
  console.log("loggedIn ? ", isLoggedIn);

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthRoutePrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  // console.log(isApiAuthRoute);

  if (isApiAuthRoute) {
    // console.log("returned null from middleware");
    return null;
  }

  //if visit signUp of signin we redirec to dashboard page
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("to dashboard")
      return Response.redirect(new URL(afterLoginDefaultPage, req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes[0], req.nextUrl));
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  // matcher: ["/signin","/signup"]
}
