"use client"
import React from 'react'
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/actions/atoms/messageAtom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, CheckSquare, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const routes = [
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-red-500"
  },
  {
    label: "Image Generation",
    href: "/imagegeneration",
    icon: ImageIcon,
    color: "text-violet-500",
  },
  {
    label: "Video Generation",
    href: "/video",
    icon: VideoIcon,
    color: "text-yellow-500",
  },
  {
    label: "Music Generation",
    href: "/music",
    icon: Music,
    color: "text-orange-500",
  },
  {
    label: "Code Generation",
    href: "/codegeneration",
    icon: Code,
    color: "text-blue-500",
  },
]

function Modal() {
  const [modal, setModal] = useRecoilState(modalAtom);
  const router = useRouter();

  async function onSubscibe() {
    try {
      console.log("inside onSubscibe");
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Stripe Error ");
    }
  }

  return (
    <div onClick={() => setModal(!modal)}>
      {
        modal ?
          <div className='fixed flex justify-center items-center text-white inset-0 z-10 bg-opacity-50 backdrop-blur-md'
          >
            <Card className='w-2/6'>
              <CardHeader>
                <CardTitle className='text-center'>
                  Upgrade to Premimum
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {routes.map((route) => (
                  <div key={route.label} className="flex justify-between text-center w-full border-2 rounded-xl px-4 py-3 ">
                    <div className='flex items-center gap-2'>
                      <route.icon className={cn("h-5 w-5", route.color)} />
                      <div className="font-semibold">
                        {route.label}
                      </div>
                    </div>
                    <div>
                      <CheckSquare className='text-sm' size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                ))}
                <Button className='bg-gradient-to-r from-indigo-500 to-pink-500 w-full'
                  onClick={() => {
                    onSubscibe();
                    router.push("/conversation");
                  }}
                >
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
          :
          null}
    </div>
  )
}

export default Modal
