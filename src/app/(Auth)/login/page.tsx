import React from 'react';
import {google_icon, icon} from "~/assets/exporter";
import Image from "next/image";
import {getGoogleOAuthURL} from "~/utils/getOAuthURL";
import {Button} from "~/components/Button";
import {verifyToken} from "~/service/jwt.service";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {BlurImage} from "~/components/BlurImage";
import metaTag from "~/utils/MetaTag";
const Login = async () => {

await checkUser();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white shadow-lg rounded-lg px-12 pt-8 pb-12 mb-8 flex flex-col">
                <div className=" flex flex-col items-center">
                    <BlurImage src={icon} alt={'icon'} className="w-16 h-16 " loading={'lazy'}/>

                    <h1 className="text-subheading font-extrabold text-center ">Please sign in to continue
                    </h1>
                </div>
                <div className="flex justify-center">

                </div>
                <div className="flex justify-center mt-8">
                    <Button variant={'border'} onClick={getGoogleOAuthURL} className=" font-bold flex items-center text-caption text-black rounded-lg">
                        <Image src={google_icon} alt="Google Sign In" className="w-12 h-12" />
                        Sign in with Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
const checkUser = async () => {
    const isTokenValid = await verifyToken(cookies().get('access_token')?.value as string);
    if (isTokenValid) {
        redirect('/')
    }
}
