import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});
interface chatCompletion {
  role  : "user" | "assistant" | "system";
  content : string
}
const instructionMessage : chatCompletion = {
  role : "system",
  content : "You are a code generator. YOu must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Array.isArray(messages) || messages.some(m => !m.role || !m.content)) {
      return new NextResponse("Invalid message format", { status: 400 });
    }


    const response = await openai.chat.completions.create({
      model: "gpt-4.1", 
      messages : [instructionMessage,...messages]
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("CONVERSATION_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
