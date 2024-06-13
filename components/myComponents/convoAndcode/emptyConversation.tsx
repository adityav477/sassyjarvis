import { MessageCircleOff } from 'lucide-react';
import React from 'react'

function EmptyConversation() {
  return (
    <div className='w-full mt-8 flex flex-col text-black/25 justify-center items-center gap-4'>
      <MessageCircleOff size="96" />
      <div>
        No Conversation Started
      </div>
    </div>
  )
}

export default EmptyConversation;
