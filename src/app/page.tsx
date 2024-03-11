import React from 'react';
import Linker from "~/components/Linker";
import {arrow_right_icon} from "~/assets/exporter";
import Link from "next/link";
import {Button} from "~/components/Button";
import {getGoogleOAuthToken} from "~/service/oAuth.service";
import {getGoogleOAuthURL} from "~/utils/getOAuthURL";

const Page = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    return (
        <div className={'grid grid-rows-3 h-full p-4'}>
            <div className={'w-full flex flex-col justify-around items-center'}>
                <h1 className={'text-heading text-primary'}>Welcome to my website!
                 We regularly update our content. here
                </h1>
<div className={'flex gap-2'}>
<Linker text={'About'} url={''} iconPath={arrow_right_icon}/>
    <Linker text={'About'} url={''} iconPath={arrow_right_icon}/>
    <Linker text={'About'} url={''} iconPath={arrow_right_icon}/>
</div>
            </div>
            <div className={'w-full row-span-2 px-2'}>
       <div className={'flex justify-between'}>
           <h1 className={' font-semibold text-subheading text-primary'}> All Content</h1>

       </div>
            </div>
            <Button onClick={getGoogleOAuthURL}>
                Google
            </Button>
        </div>
    );
};

export default Page;
const Paths = ['/', '/blog', '/about', '/contact', '/projects']