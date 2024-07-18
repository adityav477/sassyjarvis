"use client"
import TypeWriterComponent from "typewriter-effect";
import { Dancing_Script } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const font = Dancing_Script({
  weight: "700",
  subsets: ["latin"]
})

function LandingContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className='py-36 text-center space-y-5'>
      <div className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        Generate to fullest!
      </div>
      <div className=' mx-auto mt-4 font-semibold text-transparent w-2/4 bg-clip-text text-center bg-gradient-to-r from-pink-500 to-blue-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl '>
        <TypeWriterComponent
          options={{
            strings: [
              "ChatBot.",
              "Photo Generation.",
              "Video Generation.",
              "Music Generation.",
              "Code Generation.",
            ],
            autoStart: true,
            loop: true
          }}
        />
      </div>
      <div className="text-sm md:text-md text-zinc-400">
        All Generations in One Place !
      </div>
      <div className="text-white">
        <Link href={isLoggedIn ? "/dashboard" : "/signup"}>
          <Button className="bg-gradient-to-r from-pink-500 via-teal-500 to-blue-500">
            Start Generating for Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs ">
        No Credit Card required !
      </div>
    </div >
  )
}

export default LandingContent
