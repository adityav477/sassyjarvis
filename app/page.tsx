"use client"
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/myComponents/landingPage/landingNavbar";
import LandingContent from "@/components/myComponents/landingPage/landingContent";
import Testimonials from "@/components/myComponents/landingPage/testimonials";


export default function Home() {
  let isLoggedIn = false;
  const session = useSession();

  if (session?.data?.user) {
    console.log("hello")
    isLoggedIn = true;
  }
  return (
    <div className="h-screen w-full overflow-auto bg-[#111827]">
      <LandingNavbar isLoggedIn={isLoggedIn} />
      <LandingContent isLoggedIn={isLoggedIn} />
      <Testimonials />
    </div>
  );
}
