"use client"
import Heading from '@/components/myComponents/heading'
import z from "zod";
import { Button } from '@/components/ui/button'
import { ImageSchema, amountOfPhotos, resolutions } from '@/schemas'
import { Brain, Image, User } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import generateCode from '@/app/api/codegeneration/route';
import InformationRenderComponent from '@/components/myComponents/convoAndcode/inforRenderComponent';
import { useRouter } from 'next/navigation';
import EmptyConversation from '@/components/myComponents/convoAndcode/emptyConversation';
import LoadingComponent from '@/components/myComponents/convoAndcode/loadingComponent';


interface messageType {
  prompt: string,
  response: string
}

function CodeGeneration() {
  const [messages, setMessages] = useState<messageType[]>([]);
  const router = useRouter();
  const { handleSubmit, reset, register, formState: { isSubmitted, isLoading, isSubmitting } } = useForm<z.infer<typeof ImageSchema>>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      message: "",
      numberOfImages: 1,
      resolution: "256x256"
    }
  });

  const onSubmit = async (values: z.infer<typeof ImageSchema>) => {
    console.log(values);
    console.log("Hello")
    const prompt = values.message;
    // console.log(process.env.OPENAI_API_KEY)
    try {
      // const response = await generateCode(prompt);
      // // const response = "```import React from 'React'```";
      // // await new Promise((resolve) => setTimeout(resolve, 5000));
      // if (response) {
      //   setMessages((currentValue) => [...currentValue, { prompt: prompt, response: response }]);
      //   reset();
      // }
    } catch (error) {
      alert("Something Went Wrong");
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        label='Image Generation'
        subHeading='Give your imagination an image'
        icon={Image}
        color="text-pink-800"
        bgcolor="bg-pink-200/50"
      />
      <div className='px-4 rounded-lg border-2 border-black/10 py-2 m-8 lg:px-8 lg:mx-8 '>
        <form onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-12 gap-4 '>
          <input placeholder='Ask till your heart Content!'
            className='col-span-12 lg:col-span-6 focus-visible:bg-none focus-visible:outline-none'
            {...register("message")}
          />
          <select
            className='text-center text-sm font-semibold col-span-6 lg:col-span-2 w-full border-2 border-black/10 rounded-lg '>
            {amountOfPhotos.map((amount) => (
              <option {...register("numberOfImages")}
                value={amount.value} key={amount.value}>
                {amount.label}
              </option>
            ))}
          </select>
          <select
            className='text-center text-sm font-semibold col-span-6 lg:col-span-2 w-full border-2 border-black/10 rounded-lg '>
            {resolutions.map((resolution) => (
              <option {...register("resolution")}
                value={resolution.value}>
                {resolution.label}
              </option>
            ))}
          </select>
          <Button variant="default" type='submit'
            className='col-span-12 lg:col-span-2'
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </div>
      <div className='flex flex-col-reverse justify-center gap-4'>
        {messages.length == 0 && !isSubmitting &&
          <EmptyConversation />
        }

        {isSubmitted && messages.map((message) => (
          <div key={message.prompt}>
            <div>
              <InformationRenderComponent icon={User} isMarkdown={false} content={message.prompt} color="text-red-500" bgcolor="bg-red-200/10" />
            </div>
            <div>
              <InformationRenderComponent icon={Brain} isMarkdown={true} content={message.response} color="text-green-500" bgcolor="bg-green-200/10" />
            </div>
          </div>
        ))}
        {isSubmitting && <LoadingComponent />}
      </div>
    </div>
  )
}

export default CodeGeneration; 
