import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, generateAccessToken, generateRefreshToken } from "~/service/jwt.service";
import { hashPassword } from "~/utils/passwordHasher";
import { prisma } from "~/utils/utils";

export const POST=async (req:NextRequest)=>{
    try {
        const {name,email,password} = await req.json();
        const existUser=await prisma.user.findUnique({where:{email}})

        if(existUser){
            console.log(existUser);
            
            return NextResponse.json({message: 'User already exist with this email. Please Consider Logging in'}, {status: 400, headers: { 'Content-Type': 'application/json' }})
        }
        
        const user=await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:await hashPassword(password) as string,
                provider:'email',
                isEmailVerified:false,
                emailVerifToken:"",
                credits:10,
            }
        })
const token=await generateAccessToken(user?.id as number)
const rt=await generateRefreshToken(user?.id as number)
cookies().set('access_token',await generateAccessToken(user.id),cookieOptions(10));
cookies().set('rt',await generateRefreshToken(user.id),cookieOptions(20));
revalidateTag('profile')
        return NextResponse.json({message:  'success signup'}, {status: 200, headers: { 'Content-Type': 'application/json' }})
        
        
    } catch (error) {
        console.log(error);
        
     return NextResponse.json({message:  'failed to signup'+error}, {status: 400, headers: { 'Content-Type': 'application/json' }})   
    }
}