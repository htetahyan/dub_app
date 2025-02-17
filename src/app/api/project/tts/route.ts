import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parse } from "path";
import { uploadArrayBuffer } from "~/service/storage.azure";
import { getCurrentUser } from "~/service/user.service";
import { textToSpeech } from "~/utils/AzureSpeechApi";
import { prisma } from "~/utils/utils";

export const POST = async (request: Request) => {
    try { 
        const accessToken=cookies().get('access_token')?.value
        const user = await getCurrentUser(accessToken)  
          const subscription = await prisma.subscription.findFirst({where:{userId:user?.id}})
    const form=await request.formData()
    const text=form.get('text') as string
    

    const voice=form.get('voice') as string
    const projectName=form.get('projectName') as string
    const currentLanguage=form.get('currentLanguage') as string
    const targetLanguage=form.get('targetLanguage') as string
    const totalCredits=form.get('totalCredits') as string
    if(user?.credits! <parseInt(totalCredits)){
        return NextResponse.json({message: 'credit is not enough'}, {status: 200});
    }
    const speechAudioData=await textToSpeech(text,voice,targetLanguage)
    const url = await uploadArrayBuffer(speechAudioData as Buffer, `${projectName}.wav` );
    await prisma.dubbingProject.create({
        data: {
            name: projectName,
            currentLanguage,
            translateTo: targetLanguage,
            creditCost: Number(totalCredits),
            projectType: 'TTS',
            durationMinutes: Number(totalCredits) ,
            voice,user:{
                connect:{
                    id:user?.id
                }
            },
    
            url
        }
    })
  
await prisma.user.update({where:{id:user?.id},data:{credits:{decrement:parseInt(totalCredits)} }})
if( user?.isSubscribed){
    await prisma.subscription.update({where:{id:subscription?.id},data:{credits:{decrement:parseInt(totalCredits)}}})
}
revalidateTag('user');


    return NextResponse.json({message: 'success'}, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'something went wrong'}, {status: 500});
    }
}