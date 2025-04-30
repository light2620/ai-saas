import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
     if(!freeTrial && !isPro){
      return new NextResponse("Free Trial has expired",{status : 403})
    }
    const output: any = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          alpha: 0.5,
          prompt_a: prompt,
          denoising: 0.75,
          seed_image_id: "vibes",
          num_inference_steps: 50
        }
      }
    );

    const stream = output.audio;
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:audio/wav;base64,${base64}`;
    if(!isPro) await increaseApiLimit();
    return NextResponse.json({ audio: dataUrl });
  } catch (error) {
    console.error("CONVERSATION_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
