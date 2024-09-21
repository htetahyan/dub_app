import { NextRequest, NextResponse } from "next/server";
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { dubAudio, processDubbingAndSynthesis } from "~/utils/AzureSpeechApi";
import { prisma } from "~/utils/utils";
import { extractUserIdFromToken } from "~/service/jwt.service";
import { revalidateTag } from "next/cache";
import { getCurrentPricing } from "~/service/server.service";
import { getCurrentUser } from "~/service/user.service";
const isNumber=(x:string)=>!isNaN(Number(x))
export const POST = async (request: NextRequest) => {
    try {
        // Extract token and user ID
        const token = request.cookies.get('access_token')?.value;
        if (!token) throw new Error('Missing access token');

       const user= await getCurrentUser(token);
        if (!user) throw new Error('User not found');

        // Extract form data
        const formData = await request.formData();
        const file = formData.get('sourceFile') as Blob;
        const fileName = formData.get('fileName') as string;
        const currentLanguage = formData.get('currentLanguage') as string;
        const translateTo = formData.get('translateTo') as string;
        const voice = formData.get('voice') as string;
        const projectName = formData.get('projectName') as string;
        const duration= Math.ceil(parseInt(formData.get('audioDuration')as string))
        if(duration<0 || duration===null) return NextResponse.json({message:'Invalid audio duration. server cant detect'},{status:500});
        if (!file || !fileName || !currentLanguage || !translateTo || !voice || !projectName) {
            throw new Error('Missing required fields');
        }

const credits = duration;
if(user.credits< credits) return NextResponse.json({message:'Insufficient credits for this project. Try with lower audio duration or upgrade your subscription'},{status:500});

const audioUrl = await processDubbingAndSynthesis(fileName, file, voice, currentLanguage, translateTo);

        // Get audio duration and calculate credits
      
   

        // Process dubbing and synthesis
  
 
        // Transaction: Create project and decrement credits based on subscription status
        const isSubscribed = user.isSubscribed;
        await prisma.$transaction([
            prisma.dubbingProject.create({
                data: {
                    name: projectName,
                    currentLanguage,
                    translateTo,
                    voice,
                    url: audioUrl,
                    durationMinutes: duration || 0,
                    uploadType: 'FILE',
                    projectType: 'ATA',
                    creditCost: credits,
                    user: { connect: { id: user.id } },
                    status: 'PENDING',
                },
            }),
            !isSubscribed
                ? prisma.user.update({
                      where: { id: user.id },
                      data: {
                          credits: { decrement: credits },
                      },
                  })
                : prisma.subscription.update({
                      where: { userId: user.id },
                      data: {
                          credits: { decrement: credits },
                      },
                  }),
        ]);
 
        // Revalidate cache for the project list
        revalidateTag('projects');

        // Respond with the result
        revalidateTag('user');
        return NextResponse.json({ message: 'Project created successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message || 'Something went wrong' }, { status: 500 });
    }
};

// Helper to get audio duration using FFmpeg and a Readable stream


const getDurationFromUrl=async (url:string)=>{
    return new Promise((resolve, reject)=>{
        ffmpeg()
        .input(url)
        .ffprobe((err:any, data:any)=>{
            if(err) reject(err)
            resolve(data.format.duration)
        })
    })
}