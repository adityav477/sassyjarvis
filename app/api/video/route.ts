import Replicate from 'replicate';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(
  req: Request
){
  try{
    const session = await auth();

    if(!session){
      return new NextResponse("Unauthorized",{status: 412});
    }

    const body = await req.json();
    const {prompt} = body;

    if(!prompt){
      return new NextResponse("Response is Necessary",{status: 411});
    }

    const input = {
    fps: 24,
    width: 1024,
    height: 576,
    prompt:  prompt,
    negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
  };

   const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
   console.log(output)
   return NextResponse.json(output);

  }catch(error){
    console.log("[VIDEO_ERROR]",error); 
  }
}

