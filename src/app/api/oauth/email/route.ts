import {extractUserIdFromToken} from "~/service/jwt.service";

export const dynamic = 'force-dynamic'
import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {generateEmailVerificationToken, getUserProfile} from "~/service/server.service";
import {prisma} from "~/utils/utils";
import { sendEmailWithRetry } from "~/service/oAuth.service";
import { getCurrentUser } from "~/service/user.service";



export async function POST(request: NextRequest) {


    try {
        const accessToken=request.cookies.get('access_token')?.value as string
        const user = await getCurrentUser(accessToken)   
           if(!user) return NextResponse.json({message: 'Unauthorized'}, {status: 401});
        
        if (new Date(user?.emailTokenSentAt!).getTime() > Date.now() - 3 * 60 * 1000) {
            console.log("Attempt to resend within 3 minutes.");
            return NextResponse.json({message: 'Please wait for 3 min'}, {status: 401});
        }
        const emailToken = generateEmailVerificationToken();
         await prisma.user.update({
            where: { id: user?.id },
            data: {
                emailVerifToken: emailToken,
                emailTokenSentAt: new Date()
            },
        });

        await sendEmailWithRetry(user, emailToken);

        return NextResponse.json({message: 'Email sent successfully'}, {status: 200});
    } catch (error:any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({message:  "Failed to send email. Try again later"}, {status: 400});
    }
}

export async function GET(request: NextRequest, {params}: { params: { token: string } }) {

    try {
        const access_token = request.cookies.get('access_token')?.value as string;
        const id = await extractUserIdFromToken(access_token);
        const user=await prisma.user.findFirstOrThrow({where:{id}})
        const token = request.nextUrl.searchParams.get('token') as string;
if(user?.emailVerifToken!==token){
    return NextResponse.json({error: 'Please login again'}, {status: 401});
}
        if (!token) {
            return NextResponse.json({error: 'Please login again'}, {status: 401});
        }

         await prisma.user.update({
            where: {emailVerifToken: token,id: user?.id},
            data: {emailVerifToken: '', isEmailVerified: true}
        });
        return NextResponse.json({message: 'Email verified successfully'}, {status: 200});
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({message: "Failed to verify your email"}, {status: 500});
    }
}

