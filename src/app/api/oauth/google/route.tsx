import {getGoogleOAuthToken, getGoogleUserInfo} from "~/service/oAuth.service";
import {createSession, findExistORCreateUser} from "~/service/user.service";

import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {cookieOptions, generateAccessToken, generateRefreshToken} from "~/service/jwt.service";
import {USER} from "~/db/schema/schema";
import {revalidateTag} from "next/cache";

export const GET = async (request: NextRequest) => {
    const code= request.nextUrl.searchParams.get('code')
    try {

        const {expires_in, access_token,token_type,refresh_token,scope,id_token} = await getGoogleOAuthToken(code as string);
        const google_user=await getGoogleUserInfo(id_token,access_token);

    const user=await findExistORCreateUser(google_user.email,google_user.name,google_user.picture) as USER
    revalidateTag('profile')
cookies().set('access_token',await generateAccessToken(user.id),cookieOptions);

        cookies().set('refresh_token',await generateRefreshToken(user.id),cookieOptions)
     
  

return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')

    } catch (error) {

        // @ts-ignore
        return NextResponse.json({message: error.message}, {status: 500});
    }
    //get token

}
