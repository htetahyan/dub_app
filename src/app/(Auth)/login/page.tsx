import React from 'react';
import { google_icon, icon } from '~/assets/exporter';
import Image from 'next/image';
import { getGoogleOAuthURL } from '~/utils/getOAuthURL';
import { Button } from '~/components/ui/button';
import { verifyToken } from '~/service/jwt.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BlurImage } from '~/components/BlurImage';
import AuthForm from '~/components/AuthForm';

const Login = async () => {
    await checkUser();

    return (
        <div className=" flex items-center h-screen justify-center bg-gray-100 text-black">

                {/* Auth Form */}
                    <AuthForm />



                {/* Google Sign In Button */}

        </div>
    );
};

export default Login;

const checkUser = async () => {
    const isTokenValid = await verifyToken(cookies().get('access_token')?.value as string);
    if (isTokenValid) {
        redirect('/');
    }
};
