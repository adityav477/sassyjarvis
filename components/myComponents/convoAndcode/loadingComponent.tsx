import React from 'react'
import { LoaderCircle } from 'lucide-react'

function LoadingComponent() {
  return (
    <div className='w-full mt-8 flex text-black/30 flex-col justify-center items-center gap-2'>
      <div className='animate-spin'>
        <LoaderCircle size="72" strokeWidth="1.5" />
      </div>
      <div className=''>
        Preparing the Response...
      </div>
    </div>
  )
}

export default LoadingComponent
