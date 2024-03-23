
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