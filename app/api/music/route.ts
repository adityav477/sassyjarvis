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
    prompt_b: prompt
    };

   const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
   // console.log("before returning");
   // console.log(output)
   return NextResponse.json(output);

  }catch(error){
    console.log("[Music_Error]",error); 
  }
}

// export default async function generateMusic(prompt :string ){
//   const input = {
//     prompt_b: prompt
//   };
//
//   const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });
//   console.log(output)
//   return output;
// }
//=> {"audio":"https://replicate.delivery/pbxt/SCiO1SBkqj7gL5c...
