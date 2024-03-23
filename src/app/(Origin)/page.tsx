import dynamic from 'next/dynamic';
import React from 'react';
const ShowCase=dynamic(()=>import('../../components/blogs/ShowCase'))

const Page = async () => {

    return (
        <div className={'grid  h-full p-4 '}>

            <div className={'w-full flex flex-col  h-fit py-10 justify-around items-center'}>
                <h1 className={' text-subheading lg:text-heading text-primary leading-7'}>
                    Welcome to My Blog site.
           A space where I share my knowledge and passion for technology.
                </h1>

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

