"use client"
import Heading from '@/components/myComponents/heading'
import z from "zod";
import { Button } from '@/components/ui/button'
import { ConversationSchema } from '@/schemas'
import { Brain, MessageSquare, Music, User, Video } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { VideoOff } from 'lucide-react';
import LoadingComponent from '@/components/myComponents/convoAndcode/loadingComponent';
import axios from "axios";
// import { generateVideo } from '@/app/api/video/route';
import { NextResponse } from 'next/server';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/actions/atoms/messageAtom';
import toast from 'react-hot-toast';



function Conversation() {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [video, setVideo] = useState<string>();
  const router = useRouter();
  const { handleSubmit, reset, register, formState: { isLoading, isSubmitting } } = useForm<z.infer<typeof ConversationSchema>>({
    resolver: zodResolver(ConversationSchema),
  });

  const onSubmit = async (values: z.infer<typeof ConversationSchema>) => {
    console.log(values);
    const prompt = values.message;
    console.log(prompt);
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", { prompt: prompt });
      // const response = await generateVideo(prompt);
      console.log("response reached back");
      // console.log(response);
      console.log(response);
      setVideo(response?.data[0]);

      if (typeof response === "string") {
        setVideo(response);
      } else if (response instanceof NextResponse) {
        if (response?.status === 401) {
          console.log("inside error of video page");
          setModal(true);
        } else {
          toast.error("Error occured while generating video");
        }
      }
      reset();
    } catch (error) {
      toast.error("Error While Generating Video Resposnse");
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        label='Video Generation'
        subHeading='Prompt To Video'
        icon={Video}
        color="text-yellow-800"
        bgcolor="bg-yellow-200/50"
      />
      <div className='px-4 rounded-lg border-2 border-black/10 py-2 m-8 lg:px-8 lg:mx-8 '>
        <form onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-12 gap-4 '>
          <input placeholder='Ask till your heart Content!'
            className='col-span-12 lg:col-span-10 focus-visible:bg-none focus-visible:outline-none'
            {...register("message")}
          />
          <Button variant="default" type='submit'
            className='col-span-12 lg:col-span-2'
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </div>
      <div className='flex flex-col-reverse justify-center gap-4'>
        {!video && !isSubmitting &&
          <div className='w-full mt-8 flex flex-col text-black/25 justify-center items-center gap-4'>
            <VideoOff size="96" />
            <div>
              No Videos Generated
            </div>
          </div>
        }

        {video &&
          <div className='w-full p-2 lg:px-8'>
            <video controls className='w-full aspect-video rounded-lg border-black/50 '>
              <source src={video} />
            </video>
          </div>
        }

        {isSubmitting && <LoadingComponent />}
      </div>
    </div>
  )
}

export default Conversation
