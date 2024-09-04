import React from 'react';
import { Button } from "~/components/ui/button";
import Link from "next/link";
import Auth_Btn from "~/components/AuthBtn";
import { getUserProfile } from "~/service/server.service";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import Image from 'next/image';
import { Logo } from '~/assets/exporter';

const Header = async () => {
    const token = cookies().get('access_token')?.value;
    const user = token ? await getUserProfile(token) : null;

    return (
        <div className={'px-8 w-full max-w-full overflow-x-hidden flex justify-between items-center h-[90px]'}>
            <div className='w-[100px] h-auto relative'>
                <Image src={Logo} alt="Logo" className='w-full h-full' />
            </div>
            <div className='grid grid-flow-col gap-5'>
                {MenuItems.map((item) => (
                    <Link href={item.link} className={'font-semibold text-gray-600 font-primary'} key={item.name}>
                        {item.name}
                    </Link>
                ))}
            </div>
            <div>
                {user ? <UserMenu user={user} /> : <Auth_Btn user={user} />}
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

export function UserMenu({ user }: { user: any }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                <Image
                    src={user?.picture ?? ''} 
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <div className="p-2">
                    <p className="text-gray-900 font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <hr className="my-1" />
                <DropdownMenuItem>
                    <Link href="/profile" className="block w-full text-left px-4 py-2">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/billing" className="block w-full text-left px-4 py-2">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Auth_Btn user={user} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
