import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { checkLimit, increaseFreeLimit } from "@/lib/apiLimit";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

let chatSession: any;

// async function generateCode(prompt: string) {

export async function POST(
  req: Request
) {
  const response = await checkLimit();

  if (!response) {
    return new NextResponse("Something went while checking the limit", { status: 402 });
  }

  console.log("response is ", response);

  if (!response?.plan && !response?.leftGenerations) {
    return new NextResponse("Free Limit Expired", { status: 401 });
  }

  if (!chatSession) {
    chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  }

  const body = await req.json();
  const { prompt } = body;

  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    if (result?.response && !response?.plan) {
      await increaseFreeLimit();
    }

    return NextResponse.json(result.response.text());
  } catch (error) {
    console.log("error in route.ts");
    return new NextResponse(`Error while Generating Response: ${error}`, { status: 409 });
  }
}

// export default generateCode;

