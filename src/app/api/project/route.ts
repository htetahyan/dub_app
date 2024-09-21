import { NextRequest, NextResponse } from "next/server";
import { extractUserIdFromToken } from "~/service/jwt.service";
import { prisma } from "~/utils/utils";
import {getCurrentUser} from "~/service/user.service";
import {getVideoFromId} from "~/service/elevenlab.service";

export const GET = async (req:NextRequest) => {
  try {
    const accessToken=req.cookies.get('access_token')?.value
    const user = await getCurrentUser(accessToken)     
     const dubbingId=req.nextUrl.searchParams.get('dubbingId')
     const targetLanguage=req.nextUrl.searchParams.get('targetLanguage')
      if (!dubbingId) return NextResponse.json({message:"Unauthorized"},{status:401})
      if (!user) return NextResponse.json({message:"Unauthorized"},{status:401})
      const video= await getVideoFromId(dubbingId as string,targetLanguage as string)
return new Response(video, { status: 200,headers:{'Content-Type': 'video/mp4'} })
  } catch (error: any) {
    console.log(error,'///////////////')
    return NextResponse.json({ message: error.message??"Something went wrong" }, { status: 500 })
  }
}