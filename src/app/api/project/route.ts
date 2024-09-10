import { NextRequest, NextResponse } from "next/server";
import { extractUserIdFromToken } from "~/service/jwt.service";
import { prisma } from "~/utils/utils";

export const GET = async (req:NextRequest) => {
  try {  const params=req.nextUrl.searchParams
    const token=req.headers.get('access-token')!
    const page=parseInt(params.get('page')!)  || 0
     const limit=parseInt(params.get('limit')!) || 10
  const userId= await extractUserIdFromToken(token)
    const projects=await prisma.dubbingProject.findMany({
        take: limit,
        skip: page * 10,
        
        orderBy: {
            createdAt: 'desc',
          },
          where: {
            userId
          },
    })
    
    return NextResponse.json({
        projects})

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 400 })
  }
}