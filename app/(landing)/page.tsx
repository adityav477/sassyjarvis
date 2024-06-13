import { auth } from "@/auth"

export default async function LandingPage(){
  const session = await auth();
  return (
  <div>
      LandingPage
      {JSON.stringify(session)};
    </div>
  )
}
