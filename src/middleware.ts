import {NextRequest, NextResponse} from "next/server";
import * as url from "url";
import {cookieOptions, regenerateToken, verifyToken} from "~/service/jwt.service";
import {cookies} from "next/headers";

const greenFlagRoutes=['/api/oauth/google','/api/login','/']
const greenFlagApiRoutes=['/api/login','/api/signup','/api/oauth/google']
export default async function middleware(req:NextRequest, res:NextResponse) {
    const token=req.cookies.get('access_token')?.value
    const refreshToken=req.cookies.get('refresh_token')?.value
const absolutePath=req.nextUrl.pathname
    const isTokenValid =   await  verifyToken(token  as string)
    if(!isTokenValid) {
const newToken=await regenerateToken(refreshToken as string)
        if(newToken){
            cookies().set('access_token',newToken,cookieOptions)
        }
    }
    const absoluteUrl = new URL('/login', req.nextUrl.origin).toString()
    if (!greenFlagRoutes.includes(absolutePath) && !isTokenValid) {
        return NextResponse.redirect(absoluteUrl)
    }
    if(absolutePath.startsWith("/api/admin")) {

         if(!greenFlagApiRoutes.includes(absolutePath) && !isTokenValid){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }
    }
}
export const config = {
    matcher: ['/api/admin/:path*','/blogs',],
};