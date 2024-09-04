import {extractUserIdFromToken} from "~/service/jwt.service";

export const dynamic = 'force-dynamic'
import nodemailer from 'nodemailer';
import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {generateEmailVerificationToken, getUserProfile} from "~/service/server.service";
import {prisma} from "~/utils/utils";

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds

async function sendEmailWithRetry(user: any, transporter: nodemailer.Transporter, emailToken: string): Promise<void> {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            const mail = {
                from: "htetahyan@gmail.com",
                to: user.email,
                subject: 'Verify your email',
                html: `Hello <strong>${user.name}</strong><br/> Please verify your email by clicking the link: <a href='http://localhost:3000/api/oauth/email?token=${emailToken}'>Click here</a>`,
            };

            await transporter.sendMail(mail);
            break;
        } catch (error) {
            console.error(`Error sending email attempt ${retries + 1}:`, error);

            if (retries === MAX_RETRIES - 1) {
                throw new Error(`Failed to send email after ${MAX_RETRIES} attempts`);
            }

            retries++;
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
}

export async function POST(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;

    if (!token) return NextResponse.json({error: 'Please login again'}, {status: 401});

    try {
        const id = await extractUserIdFromToken(token);
        const user=await prisma.user.findUnique({where:{id}})
        console.log("emailTokenSentAt:", new Date(user?.emailTokenSentAt!).toISOString());
        console.log("Current time:", new Date().toISOString());

        if (new Date(user?.emailTokenSentAt!).getTime() > Date.now() - 3 * 60 * 1000) {
            console.log("Attempt to resend within 3 minutes.");
            return NextResponse.json({message: 'Please wait for 3 min'}, {status: 401});
        }





        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: Number(587),
            auth: {
                user: "htetahyan@gmail.com",
                pass: "xsmtpsib-ed37e78482a625aabc4f4d1e6eac72fca3ed0e55653622c8c5dc6b0ee2744cf0-4JsyXPrg5kZ2OxTU",
            },
        });

        const emailToken = generateEmailVerificationToken();
        const updatedUser = await prisma.user.update({
            where: { id: user?.id },
            data: {
                emailVerifToken: emailToken,
                emailTokenSentAt: new Date()
            },
        });
        console.log("Updated emailTokenSentAt:", updatedUser.emailTokenSentAt);

        await sendEmailWithRetry(user, transporter, emailToken);

        return NextResponse.json({message: 'Email sent successfully'}, {status: 200});
    } catch (error:any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({message: error.message ?? "Failed to send email"}, {status: 400});
    }
}

export async function GET(request: NextRequest, {params}: { params: { token: string } }) {
    try {
        const token = request.nextUrl.searchParams.get('token');

        if (!token) {
            return NextResponse.json({error: 'Please login again'}, {status: 401});
        }

        const user = await prisma.user.update({
            where: {emailVerifToken: token},
            data: {emailVerifToken: null, isEmailVerified: true}
        });
        return NextResponse.json({message: 'Email verified successfully'}, {status: 200});
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({message: "Failed to verify your email"}, {status: 500});
    }
}
