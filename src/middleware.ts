import {NextRequest, NextResponse} from "next/server";
import * as url from "url";
import {cookieOptions, regenerateToken, verifyToken} from "~/service/jwt.service";
import {cookies} from "next/headers";

const greenFlagRoutes=['/api/oauth/google','/api/login','/']
const greenFlagApiRoutes=['/api/login','/api/signup','/api/oauth/google','/api/blogs']
export default async function middleware(req:NextRequest, res:NextResponse) {
    const token=req.cookies.get('access_token')?.value
/*
const absolutePath=req.nextUrl.pathname
    const isTokenValid =   await  verifyToken(token  as string)

    const absoluteUrl =(url:string)=> new URL(url, req.nextUrl.origin).toString()
    if (!greenFlagRoutes.includes(absolutePath) && !isTokenValid) {
        return NextResponse.redirect(absoluteUrl('/login'))
    }


    if(absolutePath.startsWith("/api/admin")) {

         if(!greenFlagApiRoutes.includes(absolutePath) && !isTokenValid){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }
    }*/
}

