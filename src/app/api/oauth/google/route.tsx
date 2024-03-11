import {getGoogleOAuthToken, getGoogleUserInfo} from "~/service/oAuth.service";
import {createSession, findExistORCreateUser} from "~/service/user.service";
import {InferSelectUser, SelectUser} from "~/db/schema/schema";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {cookieOptions, generateAccessToken, generateRefreshToken} from "~/service/jwt.service";

export const GET = async (request: NextRequest) => {
    const code= request.nextUrl.searchParams.get('code')
    try {

        const {expires_in, access_token,token_type,refresh_token,scope,id_token} = await getGoogleOAuthToken(code as string);
        const google_user=await getGoogleUserInfo(id_token,access_token);
    const user=await findExistORCreateUser(google_user.email,google_user.name)
cookies().set('access_token',await generateAccessToken(user),cookieOptions)
        cookies().set('refresh_token',await generateRefreshToken(user),cookieOptions)
return NextResponse.redirect('http://localhost:3000/')

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({message: error.message}, {status: 500});
    }
    //get token

}