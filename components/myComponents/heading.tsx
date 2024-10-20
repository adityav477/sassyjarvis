"use client"
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import MobileSidebar from './navbar/mobile-sidebar';

function Heading({ label, icon: Icon, subHeading, color, bgcolor }: { label: string, icon: LucideIcon, subHeading: string, color: string, bgcolor: string }) {
  const session = useSession();
  let name = session?.data?.user?.name;

  const router = useRouter();

  return (
    <div className='flex justify-between w-full pr-4 mb-20'>
      <div className="flex items-center justify-start gap-4 px-4  lg:px-8">
        <div className={cn("p-2 rounded-lg", bgcolor)}>
          <Icon className={cn("w-10 h-10 textcenter ", color)} />
        </div>
        <div className="">
          <div className='text-3xl font-semibold'>
            {label}
          </div>
          <div className='text-sm pl-1'>
            {subHeading}
          </div>
        </div>
      </div>
      <MobileSidebar />
      <div className='hidden md:block'>
        {name &&
          <Button variant="default" size="icon" className="col-span-1 text-green-600 bg-green-200 h-10 w-10"
            onClick={() => {
              router.push("/settings");
            }}
          >
            {name[0]}
          </Button>
        }
      </div>
    </div >
  )
}

export default Heading
