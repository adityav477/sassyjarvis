
export const publicRoutes = [
  "/",
  "/error",
  "/api/webhook",
]

//the authRoutes shouldn't be blocked if the user is logged in or not doesn't matter
export const authRoutes = [
  "/signin",
  "/signup",
  "/error"
]

export const apiAuthRoutePrefix = "/api/auth"

export const afterLoginDefaultPage = "/dashboard";

