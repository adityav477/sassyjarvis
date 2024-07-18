"use client"
import { Brain } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

function LandingNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {

  return (
    <div className="flex items-center justify-between gap-1 mx-4 mt-4" >
      <div className='flex items-center gap-2 '>
        <Brain className='text-sky-500' />
        {/* <h1 className="text-white font-bold text-2xl" > */}
        <h1 className='text-white text-3xl font-semibold'>
          Sassy
        </h1>
      </div>
      <div>
        <Link href={isLoggedIn ? "/dashboard" : "/signup"} className='text-center '>
          <Button className='text-sm rounded-xl bg-white text-black '>
            {isLoggedIn ?
              <span>Dashboard</span> :
              <span>Get Strted</span>
            }
          </Button>
        </Link>
      </div>
    </div >
  )
}

export default LandingNavbar
