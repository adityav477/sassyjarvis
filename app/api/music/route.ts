import Replicate from 'replicate';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { checkLimit, increaseFreeLimit } from '@/lib/apiLimit';


export async function POST(
  req: Request
) {
// export async function generateMusic(prompt: string) {
  try {
    // const session = await auth();
    //
    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 412 });
    // }

    const response = await checkLimit();
    console.log("checkLimit in music/route", response);

    if (!response) {
      return new NextResponse("Something went while checking the limit", { status: 402 });
    }

    // console.log("response is ", response);

    if (!response?.plan && !response?.leftGenerations) {
      console.log("inside route.ts of music limit expired ");
      return new NextResponse("Free Limit Expired", { status: 401 });
    }

    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is Necessary", { status: 411 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const input = {
      prompt_b: prompt
    };

    console.log("Before output in music routes")
    const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input: input });
    console.log("output is ", output);
    if (output && !response?.plan) {
      await increaseFreeLimit();
    }

    console.log("output is ",output);
    return NextResponse.json(output);

    // const output = "https://replicate.delivery/czjl/7ig5U1LZrZZPCFte1J4a8skeHf1stVk4AZItucxD6opNqz7lA/gen_sound.wav";
    // console.log("output is ", JSON.stringify(output));
    // console.log("before returning");
    // console.log(output)
    // return NextResponse.json(output);
  } catch (error) {
    console.log("[Music_Error]", error);
    return new NextResponse(`${error}`, { status: 500 });
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
