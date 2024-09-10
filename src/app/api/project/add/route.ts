import { NextRequest, NextResponse } from "next/server";
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { dubAudio, processDubbingAndSynthesis } from "~/utils/AzureSpeechApi";
import { prisma } from "~/utils/utils";
import { extractUserIdFromToken } from "~/service/jwt.service";
import { revalidateTag } from "next/cache";

export const POST = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('access_token')?.value!;
        const userId=await extractUserIdFromToken(token);
        if(!userId) throw new Error('User not found');
        const user = await prisma.user.findUnique({
            where: {
                id: userId as number
            }
        })
        if(!user) throw new Error('User not found');

        const formdata = await request.formData();
        const file = formdata.get('sourceFile') as Blob;
        const fileName = formdata.get('fileName') as string;
        const currentLanguage = formdata.get('currentLanguage') as string;
        const translateTo = formdata.get('translateTo') as string;
const voice = formdata.get('voice') as string;
        // Convert Blob to Readable Stream
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const fileStream = Readable.from(fileBuffer);

        // Get audio duration using stream
        const duration = await getAudioDurationFromStream(fileStream);
           console.log(translateTo);
           
    
        const res= await processDubbingAndSynthesis(fileName,file,voice,currentLanguage,translateTo);
 await prisma.$transaction([
    prisma.dubbingProject.create({
        data: {
            name: formdata.get('projectName') as string,
            currentLanguage: currentLanguage,
            translateTo: translateTo,
            voice: voice,
            url: res,
            durationMinutes: 10,
            uploadType: 'FILE',
            creditCost: 1,
            user: { connect: { id: user.id } }, // Prisma handles the userId automatically
            // Provide missing required fields
            status: 'PENDING', // Example status value, adjust as needed
        }
    }),
prisma.user.update({
    where: {
        id: user.id
    },
    data: {
        credits: {
            decrement: 1
        }
    }
})  
])
revalidateTag('projects')
      
        
        return NextResponse.json({ file:res }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message ?? 'Something went wrong' }, { status: 500 });
    }
};

const getAudioDurationFromStream = (stream: Readable): Promise<number> => {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(stream)
            .inputFormat('mp3') // Adjust the format based on your actual file type
            .ffprobe((err, metadata) => {
                if (err) {
                    return reject(err);
                }
                resolve(metadata.format.duration as number);
            });
    });
};
