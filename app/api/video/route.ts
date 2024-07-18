import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { checkLimit, increaseFreeLimit } from '@/lib/apiLimit';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

// export async function generateVideo(prompt: string) {

export async function POST(
  req: Request
) {

  const response = await checkLimit();

  if (!response) {
    return new NextResponse("Something went while checking the limit", { status: 402 });
  }

  console.log("response is ", response);

  if (!response?.plan && !response?.leftGenerations) {
    console.log("inside route.ts of conversation limit expired ");
    return new NextResponse("Free Limit Expired", { status: 401 });
  }

  const body = await req.json();
  const { prompt } = body;

  try {
    if (!prompt) {
      return new NextResponse("Prompt is Necessary", { status: 411 });
    }

    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt: prompt,
      negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
    };

    const output = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
    // const output = 'https://replicate.delivery/czjl/BzLMISYWbUZzKdDHNxdtp5QpStfRdqAm0oxF3QaHj4wtK9eSA/output-0.mp4';
    console.log(output)
    if (output && !response?.plan) {
      await increaseFreeLimit();
    }

    return NextResponse.json(output);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse(`${error}`, { status: 404 });
  }
}

