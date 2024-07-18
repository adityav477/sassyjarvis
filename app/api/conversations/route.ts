import { auth } from "@/auth";
import { checkLimit, increaseFreeLimit } from "@/lib/apiLimit";
import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
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
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

let chatSession: any;

async function generateResponse(prompt: string) {
  // console.log("before auth");
  // const session = await auth();
  // console.log(JSON.stringify(session));
  //
  // if (!session?.user?.id) {
  //   return new NextResponse("User Not found login or Signup", { status: 411 });
  // }
  //
  // const userId = session.user.id;

  const response = await checkLimit();

  if (!response) {
    return new NextResponse("Something went while checking the limit", { status: 402 });
  }

  console.log("response is ", response);

  if (!response?.plan && !response?.leftGenerations) {
    console.log("inside route.ts of conversation limit expired ");
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

  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    if (result?.response && !response?.plan) {
      await increaseFreeLimit();
    }

    return result.response.text();
  } catch (error) {
    console.log("error in route.ts");
    return error;
  }
}

export default generateResponse;

