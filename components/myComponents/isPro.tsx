"use client"
import axios from 'axios';
import { Button } from '../ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';

function IsPro({ expiry }: { expiry: Date | null | undefined }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      console.log("inside onSubscibe");
      const response = await axios.get("/api/stripe");
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      setIsLoading(false);

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Stripe Error in isPro ");
    }
  }

  return (
    <div >
      <div className='px-8 mt-8'>
        <div className='text-xl font-semibold my-2'>
          You Are on a pro Plan!
        </div>
        <div className='flex items-center justify-between p-4 border-2 border-black-300/40'>
          <div className='font-semibold'>
            Plan Valid till :-
          </div>
          <div>
            {JSON.stringify(expiry).replace(/\"/g, "")}
          </div>
        </div>
      </div>
      <Button className='mt-4 mx-8 bg-indigo-500 lg:w-1/4 w-11/12'
        onClick={handleOnClick}
      >
        {isLoading ?
          <div className='flex space-x-2 justify-center items-center dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
          </div>
          : <div>Manage Subscription</div>
        }
      </Button>
    </div>
  )
}

export default IsPro
