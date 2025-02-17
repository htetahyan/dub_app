'use client';
export const getGoogleOAuthURL = () => {

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
  window.location.href = `${rootUrl}?${new URLSearchParams(options)}`;

}