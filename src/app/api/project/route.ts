import { NextRequest, NextResponse } from "next/server";
import { extractUserIdFromToken } from "~/service/jwt.service";
import { prisma } from "~/utils/utils";
import {getCurrentUser} from "~/service/user.service";
import {getVideoFromId} from "~/service/elevenlab.service";

export const GET = async (req:NextRequest) => {
  try {
      const user=await getCurrentUser()
      const dubbingId=req.nextUrl.searchParams.get('dubbingId')
      if (!user) return NextResponse.json({message:"Unauthorized"},{status:401})
      const video= await getVideoFromId(dubbingId as string)
return new Response(video, { status: 200,headers:{'Content-Type': 'video/mp4'} })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 400 })
  }
}