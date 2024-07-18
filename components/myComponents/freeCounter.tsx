import React from 'react'
import { Progress } from '@/components/ui/progress'
import { MAX_API_LIMIT } from '@/actions/constants'
import { Button } from '../ui/button'

function FreeCounter({ leftGenerations }: { leftGenerations: number }) {
  return (
    <div className='text-sm font-semibold flex flex-col m-2 p-2 gap-4 '>
      <div>
        {leftGenerations}/3
      </div>
      <Progress
        className='h-3 '
        value={(leftGenerations / MAX_API_LIMIT) * 100} />

      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-500 blur transition-all '>
        </div>
        <div className='relative hover:blur-0 '>
          <Button
            className='text-center w-full font-semibold transition-colors duration-300 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500'
          >Upgrade</Button>
        </div>
      </div>
    </div>
  )
}

export default FreeCounter
