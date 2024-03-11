import {NextRequest, NextResponse} from "next/server";
import * as url from "url";
import {verifyToken} from "~/service/jwt.service";

const greenFlagRoutes=['/api/oauth/google','/api/login','/']
const greenFlagApiRoutes=['/api/login','/api/signup','/api/oauth/google']
export default async function middleware(req:NextRequest, res:NextResponse) {
    const token=req.cookies.get('access_token')?.value
const path=req.nextUrl.pathname
    const isTokenValid =   await  verifyToken(token  as string)
    const absoluteUrl = new URL('/login', req.nextUrl.origin).toString()
    if (!greenFlagRoutes.includes(path) && !isTokenValid) {
        return NextResponse.redirect(absoluteUrl)
    }
    if(path.startsWith("/api/admin")) {

         if(!greenFlagApiRoutes.includes(path) && !isTokenValid){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }
    }
}
export const config = {
    matcher: ['/api/admin/:path*','/blog','/blog:path',],
};