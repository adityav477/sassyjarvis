"use client"
import Heading from '@/components/myComponents/heading'
import z from "zod";
import { Button } from '@/components/ui/button'
import { ConversationSchema } from '@/schemas'
import { Music } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { MicOff } from 'lucide-react';
import LoadingComponent from '@/components/myComponents/convoAndcode/loadingComponent';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/actions/atoms/messageAtom';
// import { generateMusic } from '@/app/api/music/route';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';


function Conversation() {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [music, setMusic] = useState<string>();
  const router = useRouter();
  const { handleSubmit, reset, register, formState: { isLoading, isSubmitting } } = useForm<z.infer<typeof ConversationSchema>>({
    resolver: zodResolver(ConversationSchema),
  });

  const onSubmit = async (values: z.infer<typeof ConversationSchema>) => {
    console.log(values);
    const prompt = values.message;
    console.log(prompt);
    try {
      const response = await axios.post("/api/music", { prompt: prompt });
      // const response = await generateMusic(prompt);
      console.log("response reached back");

      // setMusic("https://replicate.delivery/czjl/7ig5U1LZrZZPCFte1J4a8skeHf1stVk4AZItucxD6opNqz7lA/gen_sound.wav");
      // Handle successful URL response
      setMusic(response.data.audio);
      if (response?.status) {
        if (response?.status === 401) {
          // Handle 401 error
          setModal(!modal);
        }
      } else {
        // Handle unexpected response type (shouldn't occur)
        toast.error("Unexpected while generating Music");
      }
    } catch (error) {
      console.log("error while generating", error);
      toast.error(`error while generating music ${error}`);
    }
  }

  return (
    <div>
      <Heading
        label='Music Generation'
        subHeading='Promt to Music'
        icon={Music}
        color="text-orange-800"
        bgcolor="bg-orange-200/50"
      />
      <div className='px-4 rounded-lg border-2 border-black/10 py-2 m-8 lg:px-8 lg:mx-8 '>
        <form onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-12 gap-4 '>
          <input placeholder='Ask till your heart Content!'
            className='col-span-12 lg:col-span-10 focus-visible:bg-none focus-visible:outline-none'
            {...register("message")}
          />
          <Button variant="indigo" type='submit'
            className='col-span-12 lg:col-span-2'
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </div>
      <div className='flex flex-col-reverse justify-center gap-4'>
        {!music && !isSubmitting &&
          <div className='w-full mt-8 flex flex-col text-black/25 justify-center items-center gap-4'>
            <MicOff size="96" />
            <div>
              No Music Generated
            </div>
          </div>
        }

        {music &&
          <div className='w-full p-2 lg:px-8'>
            <audio controls className='w-full'>
              <source src={music} />
            </audio>
          </div>}

        {isSubmitting && <LoadingComponent />}
      </div>
    </div>
  )
}

export default Conversation
