import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "~/service/user.service";
import {newDubbing} from "~/service/elevenlab.service";
import {prisma} from "~/utils/utils";
import { revalidateTag } from "next/cache";

export const POST = async (request: NextRequest) => {
    try {
        const  token=request.cookies.get('access_token')?.value
        const user=await getCurrentUser(token)
        if (!user) return NextResponse.json({message:"Unauthorized"},{status:401})
        const form = await request.formData();
        const startTime=form.get('startTime') as string
        const endTime=form.get('endTime') as string
        const durationInSeconds = getDurationInSeconds(startTime, endTime);
        if(durationInSeconds<5){
            return NextResponse.json({message:'Duration should be greater than 5 second'},{status:500})
        }
        const creditCost=Math.ceil(durationInSeconds/60)
        if(user!.credits<creditCost){
            return NextResponse.json({message:'Insufficient credits. Try with lower audio duration or upgrade your subscription'},{status:500})
        }
        const url=form.get('url') as string
        const name=form.get('projectName') as string
        const sourceLanguage=form.get('sourceLanguage') as string
        const targetLanguage=form.get('targetLanguage') as string
        const file=form.get('file') as File
        const speakers=form.get('numberOfSpeakers') as string
       const res=await newDubbing( file,name,url,sourceLanguage,targetLanguage,parseInt(speakers),getSeconds(startTime),getSeconds(endTime))
     if(res){   await prisma.dubbingProject.create({
        data:{
            url:url,
            name:name,
            currentLanguage:sourceLanguage,
            translateTo:targetLanguage,
            creditCost:creditCost,
            user:{connect:{id:user!.id}},
            projectType:'VIDEO',
            youtubeUrl: url??'',
            voice:targetLanguage,
            //@ts-ignore
            dubbingId:res.dubbing_id,
            durationMinutes:res?.expected_duration_sec
        }
       }
       )

     }
if(!res?.dubbing_id){return NextResponse.json({message:'Something went wrong'},{status:500})}
revalidateTag('user');


return NextResponse.json({message:"success"},{status:200})
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({message:error.message},{status:500})
    }
}
function normalizeTime(time: string): string {
    // Split the time into parts (hours, minutes, seconds)
    const parts = time.split(':');
  
    // Handle cases where time is incomplete
    const hours = parts[0]?.padStart(2, '0') || '00';  // Pad hours to 2 digits or default to '00'
    const minutes = parts[1]?.padStart(2, '0') || '00';  // Pad minutes to 2 digits or default to '00'
    const seconds = parts[2]?.padStart(2, '0') || '00';  // Pad seconds to 2 digits or default to '00'
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  function getDurationInSeconds(startTime: string, endTime: string): number {
    // Normalize both startTime and endTime to 'hh:mm:ss' format
    const normalizedStartTime = normalizeTime(startTime);
    const normalizedEndTime = normalizeTime(endTime);
  
    // Helper function to convert time (hh:mm:ss) to seconds
    const timeToSeconds = (time: string) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
  
    // Convert startTime and endTime to seconds
    const startSeconds = timeToSeconds(normalizedStartTime);
    const endSeconds = timeToSeconds(normalizedEndTime);
  
    // Calculate the duration in seconds
    const durationSeconds = Math.ceil(endSeconds - startSeconds);
  
    return durationSeconds;
  }
  const getSeconds=(time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }