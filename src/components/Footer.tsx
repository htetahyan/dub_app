import React from 'react';
import Link from "next/link";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Image from 'next/image';
import { BgFaq, LogoWhite } from '~/assets/exporter';

const Footer = () => {
    return (
        <>
            {/* Footer section */}
            <div className='lg:h-[30vh]  w-full relative overflow-hidden mt-20 bg-black text-white flex flex-col justify-center gap items-center'>
                <h1 className='lg:text-3xl text-xl font-bold text-center'>Deliver your best work with dubbyai.com</h1>
                <p className='text-center'>No credit card needed ✦ Unlimited time on Free plan</p>
                <Button variant={'default'} className='bg-default hover:bg-default/90 rounded-3xl'>Get Started</Button>
            </div>

            {/* FAQ section */}
            <div className='lg:h-[70vh] p-2 w-full grid lg:grid-cols-2  lg:place-items-center overflow-x-hidden'>
                <div className='place-self-center'>
                    <Badge>FAQ</Badge>
                    <h1 className='text-5xl mt-4 font-bold w-2/3'>Frequently asked questions</h1>
                  <Link href={'/contact'} className='text-default hover:text-default/90'>   <Button variant={'outline'} className='mt-4'> Talk to us</Button> </Link>
                    <div className='w-full flex justify-end'>
                        <Image src={BgFaq} alt="icon" className='w-48 h-auto flex justify-end' />
                    </div>
                </div>
                <div className='lg:w-3/4 w-full'>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item) => (
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
            <footer className="bg-black text-white py-8 w-full">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 w-full">
        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* Replace with your logo image */}
              <Image
                src={LogoWhite} // Replace with the correct path to your logo
                alt="Dubby AI Logo"
                width={100}
                height={30}
              />
            </div>
            <p className="text-sm">
              Building collaboration tools for organizations of all shapes and sizes. Hiring is just the start.
            </p>
            <p className="text-xs">&copy; 2024 Dubby AI</p>
          </div>

          {/* Links */}
          <div className='grid grid-cols-2 w-[90vw]  lg:grid-cols-3 lg:w-[50vw] gap-4'>
          <div>
            <h5 className="font-bold mb-4">Links</h5>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:underline">Features</Link></li>
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link href="/api" className="hover:underline">API</Link></li>
              <li><Link href="/signup" className="hover:underline">Sign up</Link></li>
              <li><Link href="/login" className="hover:underline">Log in</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className=''>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><Link href="/help-docs" className="hover:underline">Help docs</Link></li>
              <li><Link href="/quick-start" className="hover:underline">Quick start guide</Link></li>
              <li><Link href="/changelog" className="hover:underline">Changelog</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold mb-4 ">Company</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:underline">About us</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline">Privacy policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:underline">Terms of service</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact us</Link></li>
              <li><Link href="/discord" className="hover:underline">Discord</Link></li>
              <li><Link href="/twitter" className="hover:underline">Twitter</Link></li>
            </ul>
          </div></div>
        </div>
      </div>
    </footer>
        </>
    );
};

export default Footer;

const faqItems = [
    {
        question: "How many credits does it cost to dub?",
        answer: "For 1 minute, 1 credit. For 5 minutes, 5 credits."
    },
    {
        question: "What happens when I run out of credits?",
        answer: "No worries, you can always get more credits."
    }
];
