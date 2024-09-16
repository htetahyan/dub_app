import nodemailer from 'nodemailer';

interface GoogleOAuthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export const getGoogleOAuthToken = async (code: string): Promise<GoogleOAuthToken> => {
    const url = "https://oauth2.googleapis.com/token";
    const utils = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
        client_secret: process.env.GOOGLE_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
        grant_type: "authorization_code"
    };

    // Check if all required environment variables are set
    if (!utils.client_id || !utils.client_secret || !utils.redirect_uri) {
        throw new Error("Google OAuth environment variables are not set.");
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(utils).toString(), // URL-encode the body
        });


        if (!res.ok) {
            throw new Error(`Failed to get Google OAuth token: ${res.status} ${res.text }`);
        }
        return await res.json();
    } catch (error  ) {
        throw error;
    }
};

export const getGoogleUserInfo = async (id_token: string, access_token: string) => {
try {
    const res = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`, {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
    });
    return await res.json();
}catch (error) {
  
    throw error;
}}

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000; // 3 seconds

export async function sendEmailWithRetry(user: any, emailToken: string): Promise<void> {
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
export const transporter=nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: Number(587),
    auth: {
        user: "htetahyan@gmail.com",
        pass: "xsmtpsib-ed37e78482a625aabc4f4d1e6eac72fca3ed0e55653622c8c5dc6b0ee2744cf0-4JsyXPrg5kZ2OxTU",
    },
});