import React from 'react';

import {Button} from "~/components/Button";

import {getGoogleOAuthURL} from "~/utils/getOAuthURL";
import ShowCase from "~/components/blogs/ShowCase";
import {isTokenExpired} from "~/service/jwt.service";
import {cookies} from "next/headers";

const Page = async () => {

    return (
        <div className={'grid  h-full p-4 '}>

            <div className={'w-full flex flex-col  h-fit py-10 justify-around items-center'}>
                <h1 className={'text-heading text-primary leading-normal'}>Welcome to my blog.

           A space where I share my knowledge and passion for technology.
                </h1>

            </div>
            <div className={'w-full row-span-1 px-2'}>
       <div className={'flex justify-between'}>
           <h1 className={' font-semibold text-subheading text-primary'}> All Content</h1>

       </div>
            </div>              <ShowCase/>

            <Button onClick={getGoogleOAuthURL}>
                Google
            </Button>
        </div>
    );
};

export default Page;
const Paths = ['/', '/blog', '/about', '/contact', '/projects']
