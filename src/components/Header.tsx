'use client'
import React from 'react';
import { Button } from "~/components/ui/button";
import Link from "next/link";
import Auth_Btn from "~/components/AuthBtn";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "~/components/ui/drawer"; // Import Drawer components
import Image from 'next/image';
import { Logo } from '~/assets/exporter';
import { Menu } from 'lucide-react'; // Import a menu icon

const Header = ({ user }: { user: any }) => {
    return (
        <div className='px-8 w-full max-w-full overflow-x-hidden flex justify-between items-center h-[90px]'>
            <div className='flex items-center gap-2'>
                <Image src={Logo} alt="Logo" className='w-8 h-fit' />
                <h1 className='text-2xl font-bold text-[#6236F5] font-primary'>Contentally</h1>
            </div>

            {/* Drawer Trigger Button for Mobile */}
            <div className="md:hidden">
                <Drawer >
                    <DrawerTrigger>
                        <Button variant="outline" className="flex items-center">
                            <Menu size={24} />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                            <DrawerDescription>Select an option below.</DrawerDescription>
                        </DrawerHeader>
                        <div className='flex flex-col p-4'>
                            {MenuItems.map((item) => (
                                <Link href={item.link} className='font-semibold text-gray-600 font-primary py-2' key={item.name}>
                                    {item.name}
                                </Link>
                            ))}
                            <div>
                                {user ? (
                                    <Link href='/dashboard' className='font-semibold text-gray-600 font-primary py-2'>Dashboard</Link>
                                ) : (
                                    <Auth_Btn user={user} />
                                )}
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex grid-flow-col gap-5`}>
                {MenuItems.map((item) => (
                    <Link href={item.link} className='font-semibold text-gray-600 font-primary' key={item.name}>
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className='hidden md:block'>
                {user ? <Link href='/dashboard' className='font-semibold text-gray-600 font-primary'>Dashboard</Link> : <Auth_Btn user={user} />}
            </div>
        </div>
    );
};

export default Header;

const MenuItems = [
    { name: "Home", link: "/" },
    { name: "Pricing", link: "/pricing" },
    { name: "Contact", link: "/contact" },
];
