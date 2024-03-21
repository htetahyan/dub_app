'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import logo from '~/assets/icon.svg';
import { Button } from "~/components/Button";
import { user_icon } from "~/assets/exporter";
import {USER} from "~/db/schema/schema";

const Header = ({user}: { user: USER }) => {
    const [showPopover, setShowPopover] = useState(false);
    const popoverRef = useRef(null); // Reference to the popover element
    const buttonRef = useRef(null); // Reference to the button element

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
                            <div ref={popoverRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"> {/* Use the ref here */}
                                <div className="p-2">
                                    <p>Menu Item 1</p>
                                    <p>Menu Item 2</p>
                                    <p>Menu Item 3</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
