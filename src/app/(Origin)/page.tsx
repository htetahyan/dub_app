import React from 'react';
import ShowCase from "~/components/blogs/ShowCase";
import {jsonLd} from "../../utils/structure-schema";
import Script from "next/script";
const Page = async () => {

    return (
        <div className={'grid  h-full p-4 '}>
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <div className={'w-full flex flex-col gap-2  py-10 justify-center items-center '}>
                <h1 className={' text-subheading lg:text-heading text-primary '}>
                    Welcome to My Blog site.
                </h1>
                <h2 className={'text-body lg:text-subheading text-center text-primary '}>           A space where I share my knowledge and passion for technology.
            </h2>

            </div>
            <div className={'w-full row-span-1 px-2'}>
       <div className={'flex justify-between'}>
           <h1 className={' font-semibold text-subheading text-primary'}> All blogs</h1>

       </div>
            </div>              <ShowCase/>
            <div className={'h-0.5 w-full bg-gray-600'}/>


        </div>
    );
};

export default Page;

