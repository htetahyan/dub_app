import React from 'react';
import { jsonLd } from "../../utils/structure-schema";
import Script from "next/script";
import { BgFaq, Companies, Quote, SaasBg, Section1, Stars, Visual } from '~/assets/exporter';
import Image from 'next/image';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import Features from '~/components/home/features';
import { features } from 'process';
import { Checkbox } from '~/components/ui/checkbox';
import { Badge } from '~/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import Subscriptions from '~/components/home/Subscriptions';

const Page = async () => {
    return (
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
                <Image alt='visual image' fill  src={Visual} />
            </div>
            <div className='h-screen w-full'>not implemented yet</div>
           
            <Features/>
            <div className='h-fit w-full flex flex-col items-center'>
                <h1 className='text-3xl font-bold text-center'>Testimonials</h1>
                <h4  className='text-gray-500'>Don't just take our word for it, see what our customers have to say!</h4>
               <div className='w-3/4 gap-x-6 mt-4 grid grid-cols-3 '>
               {reviews.map((review)=>(
                   <div key={review.name} className='w-full flex flex-col gap-4'>
                    <Image src={Stars} alt="stars" className='w-1/3' />
                       <h3 className='text-md font-bold'>{review.review}</h3> 
                      <div className='w-full flex justify-between items-center'> <p className='font-semibold'>{review.name}</p>
                      <Image src={Quote} alt="quotes" className='w-12' />
                      </div>
                   </div>
                   ))}
               </div>
            </div>
          <Subscriptions/>
            <div>
            <div className='h-[30vh] mt-20 bg-black text-white flex flex-col justify-center gap-6 items-center'>
                <h1 className='text-3xl font-bold'>Deliver your best work with dubbyai.com </h1>
                <p>No credit card needed ✦ Unlimited time on Free plan</p>
                <Button variant={'default'} className='bg-default hover:bg-default/90 rounded-3xl'>Get Started</Button>
            </div>
            <div className='h-[70vh] w-screen grid grid-cols-2 place-items-center'>
<div className='place-self-center'>
    <Badge >FAQ</Badge>

    <h1 className='text-5xl mt-4 font-bold w-2/3'>Frequently asked questions</h1>
    <Button variant={'outline'} className='mt-4'> Talk to us</Button>
  <div className='w-full flex justify-end'> <Image src={BgFaq} alt="icon" className='w-48 h-auto flex justify-end'  /></div> 
</div>
<div className='w-3/4'>
<Accordion type="single" collapsible className="w-full">
     {faqItems.map((item)=>(
        <AccordionItem key={item.question} value={item.question} className='w-full'>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className='w-full'>
                {item.answer}
            </AccordionContent>
        </AccordionItem>
     ))}
    </Accordion>
</div>
            </div>
            </div>
        </div>
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
const faqItems=[{
    question:"How many credits does it cost to dub?",
    answer:" for 1 min  1 credit. for 5 min, 5 credits."

},{
    question:"What happens when I run out of credits?",
    answer:"No worries, you can always get more credits."
}]