import {NextRequest, NextResponse} from "next/server";
import { verifyToken} from "~/service/jwt.service";
const greenFlagRoutes=['/api/oauth/google','/api/login','/']
const greenFlagApiRoutes=['/api/login','/api/signup','/api/oauth/google','/api/blogs']
export default async function middleware(req:NextRequest) {
    const token=req.cookies.get('refresh_token')?.value
const isTokenValid=await verifyToken(token!)
    if(isTokenValid){
        return NextResponse.next()
    }else {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}
export const config ={
    matcher: ['/api/admin/:path*']
}

