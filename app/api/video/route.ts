import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import stream from "stream";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const pipeline = promisify(stream.pipeline);



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
    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
        prompt
        }
      }
    ) as any[];
   

   const videoStream = output[0]; 


   const videoBuffer: Buffer[] = [];
   await pipeline(
     videoStream,
     new stream.Writable({
       write(chunk, encoding, callback) {
         videoBuffer.push(chunk);
         callback();
       }
     })
   );
    
   const buffer = Buffer.concat(videoBuffer);

   const videoPath = path.join(process.cwd(), 'public', 'videos', 'generated-video.mp4');
   const dir = path.dirname(videoPath);
   if (!fs.existsSync(dir)) {
     fs.mkdirSync(dir, { recursive: true });
   }
   fs.writeFileSync(videoPath, buffer);

   if(!isPro) await increaseApiLimit();
   return NextResponse.json({
     videoUrl: `/videos/generated-video.mp4` 
   });
  } catch (error) {
    console.error("CONVERSATION_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
