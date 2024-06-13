import React from 'react'
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from "react-markdown";

function InformationRenderComponent({ content, icon: Icon, color, bgcolor, isMarkdown }: {
  content: string,
  icon: LucideIcon,
  color: string,
  bgcolor: string,
  isMarkdown: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='px-4 py-2 lg:px-8 w-full text-md rounded-lg border-2 border-black/10 mx-4 lg:mx-8'>
      {isOpen ?
        <div onClick={toggle} className={cn('flex gap-2 p-2 lg:gap-4 rounded-xl', bgcolor)}>
          <Icon className={cn('w-6 h-6 mr-2 mt-2 text-blue-500 bg-blue-200/5', color)} />
          {isMarkdown ?
            <ReactMarkdown className="text-sm overflow-hidden "
            // components={{
            //   // pre: ({ node, ...props }) => {
            //   //   <div className='overflow-auto w-full my-2 bg-black-/10 p-2 rounded-lg'>
            //   //     <pre {...props} />
            //   //   </div>
            //   // },
            //   code: ({ node, ...props }) => {
            //     <code className='bg-black/10 rounded-lg p-1' {...props} />
            //   }
            // }}
            >
              {content}
            </ReactMarkdown>
            :
            <div>
              {content}
            </div>
          }
        </div> :
        <div onClick={toggle} className={cn('flex h-auto gap-2 p-2 lg:gap-4 rounded-xl', bgcolor)}>
          <Icon className={cn('w-6 h-6 mr-2 mt-2  text-blue-500 bg-blue-200/5', color)} />
          {isMarkdown ?
            <ReactMarkdown className="text-sm overflow-hidden"
            >
              {content.slice(0, 200)}
            </ReactMarkdown>
            :
            <div>
              {content.slice(0, 200)}
            </div>
          }
        </div>
      }
    </div >
  )
}
export default InformationRenderComponent
