import {NextRequest, NextResponse} from "next/server";
import {regenerateToken} from "~/service/jwt.service";
import {cookies} from "next/headers";

export const POST = async (request: NextRequest) => {
try {
        const refreshToken =  request.cookies.get('refresh_token')?.value!
    const newToken = await regenerateToken(refreshToken);
    cookies().set('access_token', newToken);
    return NextResponse.json({message: '(Auth) success'}, {status: 200});
} catch(e) {
    return NextResponse.json({message: 'failed'}, {status: 400});
}
}
