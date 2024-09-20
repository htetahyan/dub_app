import { NextRequest, NextResponse } from "next/server";
import { sentPasswordResetLink } from "~/service/oAuth.service";
import { prisma } from "~/utils/utils";

export const POST = async (request: NextRequest) => {
 try {
    const { email } = await request.json();
     console.log(email)
   const msg= await sentPasswordResetLink(email)
       return NextResponse.json({message:msg})
 } catch (error:any) {
    return NextResponse.json({message:error?.message ?? 'cannot sent password reset link'})
 }  
}