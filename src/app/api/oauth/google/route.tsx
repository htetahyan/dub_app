import {getGoogleOAuthToken, getGoogleUserInfo} from "~/service/oAuth.service";
import {findExistORCreateUserGoogle} from "~/service/user.service";

import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {cookieOptions, generateAccessToken, generateRefreshToken} from "~/service/jwt.service";
import {revalidateTag} from "next/cache";

export const GET = async (request: NextRequest) => {
    const code= request.nextUrl.searchParams.get('code')
    try {

        const {expires_in, access_token,token_type,refresh_token,scope,id_token} = await getGoogleOAuthToken(code as string);
        const google_user=await getGoogleUserInfo(id_token,access_token);
       
    const user=await findExistORCreateUserGoogle(google_user.email,google_user.name,google_user.picture) 

 cookies().set('access_token',await generateAccessToken(user.id),cookieOptions(10));


        revalidateTag('profile')

return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL || 'https://contentally.ai')}
    catch (error) {

        // @ts-ignore
        return NextResponse.json({message: error.message}, {status: 500});
    }
    //get token

}
