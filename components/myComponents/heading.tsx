import { LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

function Heading({ label, icon: Icon, subHeading, color, bgcolor }: { label: string, icon: LucideIcon, subHeading: string, color: string, bgcolor: string }) {
  return (
    <div className="flex items-center justify-start gap-4 px-4 lg:px-8">
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
  )
}

export default Heading
