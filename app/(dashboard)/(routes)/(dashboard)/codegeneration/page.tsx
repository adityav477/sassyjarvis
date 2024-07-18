"use client"
import Heading from '@/components/myComponents/heading'
import z from "zod";
import { Button } from '@/components/ui/button'
import { ConversationSchema } from '@/schemas'
import { Brain, MessageSquare, User } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import generateCode from '@/app/api/codegeneration/route';
import InformationRenderComponent from '@/components/myComponents/convoAndcode/inforRenderComponent';
import { useRouter } from 'next/navigation';
import EmptyConversation from '@/components/myComponents/convoAndcode/emptyConversation';
import LoadingComponent from '@/components/myComponents/convoAndcode/loadingComponent';
import { modalAtom } from '@/actions/atoms/messageAtom';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';


interface messageType {
  prompt: string,
  response: string
}

function CodeGeneration() {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [messages, setMessages] = useState<messageType[]>([]);
  const router = useRouter();
  const { handleSubmit, reset, register, formState: { isSubmitted, isLoading, isSubmitting } } = useForm<z.infer<typeof ConversationSchema>>({
    resolver: zodResolver(ConversationSchema),
  });

  const onSubmit = async (values: z.infer<typeof ConversationSchema>) => {
    console.log(values);
    const prompt = values.message;
    // console.log(process.env.OPENAI_API_KEY)
    try {
      const response = await generateCode(prompt);
      // const response = "```import React from 'React'```";
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      if (response?.status === 401) {
        setModal(!modal);
      }
      else {
        setMessages((currentValue) => [...currentValue, { prompt: prompt, response: response }]);
        reset();
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      router.refresh();
    }
  }


  return (
    <div>
      <Heading
        label='Code Generation'
        subHeading='Generat Code '
        icon={MessageSquare}
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
