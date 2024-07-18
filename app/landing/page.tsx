import { auth } from "@/auth"

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="bg-blue-300">
      LandingPage
    </div>
  )
}
