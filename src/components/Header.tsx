'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import logo from '~/assets/icon.svg';
import { Button } from "~/components/Button";
import { user_icon } from "~/assets/exporter";
import {USER} from "~/db/schema/schema";
import {social_links} from "~/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
const Auth_Btn=dynamic(()=> import('./AuthBtn'),{ssr:false,loading:()=> <div className={'loader'}/>})

const Header = ({user}: { user: USER }) => {
    const [showPopover, setShowPopover] = useState(false);
    const popoverRef = useRef(null); // Reference to the popover element
    const buttonRef = useRef(null);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };



    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            //@ts-ignore
            if (popoverRef.current && !popoverRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowPopover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={'relative'}>
            <div className={'z-10 sticky top-0 border-b-2 bg-[#F9F9F9] border-gray-200 '}>
                <div className={'w-full flex justify-between items-center p-2'}>
                    <Image src={logo} alt={'logo'} className={'w-12 h-12'}/>
                    <div className="relative"> {/* Wrap the button and popover in a relative container */}
                        <Button ref={buttonRef} variant={'ghost'} className={'hover:shadow-amber-300 h-fit w-fit p-1'} onClick={togglePopover}>
                            <Image src={user?.photo || user_icon} alt={'user'} width={100} height={100} className={'w-8 h-8 object-cover'}/>
                        </Button>
                        {showPopover && (
                            <div ref={popoverRef} className="absolute right-0 mt-2 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"> {/* Use the ref here */}
                                <div className="">
                                    <p className="text-gray-500 text-caption"> @{user?.name || `guest user`}</p>

                                </div>

                                <div className={'grid gap-2 mt-3 text-primary'}>
                                    <h1 className={'text-caption'}>Contact me</h1>
                                    {[...social_links,{link:'https://htetahyan.vercel.app',name:'My portfolio'}].map((link, index)=>{
                                        return <Link  key={index} href={link.link} className="text-small px-2 underline">{link.name}</Link>
                                    })}
                                </div>
                               <Auth_Btn user={user}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
