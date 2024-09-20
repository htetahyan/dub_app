import React from 'react';
import { jsonLd } from "../../utils/structure-schema";
import Script from "next/script";
import {  Companies, Quote, SaasBg, Section1, Stars, Visual } from '~/assets/exporter';
import Image from 'next/image';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import Features from '~/components/home/features';

import Subscriptions from '~/components/home/Subscriptions';
import { getCurrentUser } from '~/service/user.service';
import { cookies } from 'next/headers';


const Page = async () => {
    const accessToken=cookies().get('access_token')?.value
    const user = await getCurrentUser(accessToken) ?? {}
       return (<>
        <div className=' h-fit  w-full relative overflow-hidden max-w-full'>
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />
            <div className='w-full flex flex-col justify-center items-center'>
                <Image src={Section1} alt="Logo" className='w-full md:w-1/2 h-full pointer-event-none' />
                <div className='w-full mt-8 flex gap-2 items-center justify-center'>
                    <Input name="email" className='w-1/2 md:w-1/4' placeholder="Enter your email" type='email' />
                    <Button className='bg-default hover:bg-default/90'>Subscribe</Button>
                </div>
                <p className='mt-4 font-primary text-[8px] lg:text-[12px] font-medium text-gray-500'>By clicking Sign Up you're confirming that you agree with our Terms and Conditions.</p>
                <div className='w-[90%] mt-8'>
                    <Image src={SaasBg} alt="Logo" className='w-full' />
                </div>
                <div className='w-full '>
                    <Image src={Companies} alt="Logo" className='w-full' />
                </div>
            </div>
            <div className='w-full h-screen relative '>
                <Image alt='visual image'  fill  src={Visual} />
            </div>
            <div className='h-screen w-full'>not implemented yet</div>
           
            <Features/>
            <div className='h-fit w-full flex flex-col items-center'>
                <h1 className='text-3xl font-bold text-center'>Testimonials</h1>
                <h4  className='text-gray-500'>Don't just take our word for it, see what our customers have to say!</h4>
               <div className='lg:w-3/4 lg:gap-x-6 p-4 lg:p-0 mt-4 grid lg:grid-cols-3 '>
               {reviews.map((review)=>(
                   <div key={review.name} className='w-full flex flex-col gap-4'>
                    <Image src={Stars} alt="stars" className='w-1/3' />
                       <h3 className='lg:text-md text-sm font-bold'>{review.review}</h3> 
                      <div className='w-full flex justify-between items-center'> <p className='font-semibold'>{review.name}</p>
                      <Image src={Quote} alt="quotes" className='w-12' />
                      </div>
                   </div>
                   ))}
               </div>
            </div>
            <h1 className='text-3xl font-bold text-center mt-6'>Pricing Plans</h1>
            <p className='text-gray-500 text-center mt-2'>Don't just take our word for it, see what our customers have to say!</p>
        <div className='lg:w-full w-[90%] mx-auto'> <Subscriptions user={user}/></div> 
            <div>
        
            </div>
        </div>
        </>
    );
};

export default Page;
const reviews=[
    {name:"Andrew jackson",
        review:"The Design System is the most versatile I could get my hands on.  Compared to all the others I have tried, this is the best premium library out there!"
    }, {name:"Andrew jackson",
        review:"The Design System is the most versatile I could get my hands on.  Compared to all the others I have tried, this is the best premium library out there!"
    }, {name:"Andrew jackson",
        review:"The Design System is the most versatile I could get my hands on.  Compared to all the others I have tried, this is the best premium library out there!"
    }
]
const planCards=[
    {
        name:"Personal",
        price:"5/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],

    },
    {
        name:"Business",
        price:"20/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],
    },
    {
        name:"Enterprise",
        price:"100/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],
    },
]
