import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, generateAccessToken, generateRefreshToken } from "~/service/jwt.service";
import { comparePassword, hashPassword } from "~/utils/passwordHasher";
import { prisma } from "~/utils/utils";
export const POST=async (req:NextRequest)=>{
try {
    const {email,password} = await req.json();
    const user=await prisma.user.findUnique({where:{email}})

    if(!user){
        return NextResponse.json({message: 'user not found'}, {status: 400, headers: { 'Content-Type': 'application/json' }})
    }
    if(user?.provider!=='email'){
        return NextResponse.json({message: 'Please login with ' + user?.provider}, {status: 400, headers: { 'Content-Type': 'application/json' }})

    }
    const isMatch =await comparePassword(password,user?.password as string)

    if(!isMatch){
        return NextResponse.json({message: 'incorrect password'}, {status: 400, headers: { 'Content-Type': 'application/json' }})
    }

    const token=await generateAccessToken(user?.id as number)
    const rt=await generateRefreshToken(user?.id as number)

    cookies().set('access_token',await generateAccessToken(user.id),cookieOptions(10));
    cookies().set('rt',await generateRefreshToken(user.id),cookieOptions(20));  
revalidateTag('profile')
revalidateTag('user')

    return NextResponse.json({message:  'success login'}, {status: 200, headers: { 'Content-Type': 'application/json' }})
    
}catch(e:any){
    console.log(e);
    
    return NextResponse.json({message:  'failed to login'}, {status: 400, headers: { 'Content-Type': 'application/json' }})
}
}