import React from 'react';
import Image from "next/image";
import logo from '~/assets/icon.svg'
import {log} from "node:util";
import {user_icon} from "~/assets/exporter";
import {Button} from "~/components/Button";
const Header = () => {
    return (
        <div className={'z-10 sticky top-0 border-b-2 bg-[#F9F9F9] border-gray-200 '}>

            <div className={'w-full flex justify-between items-center p-2'}>
<Image src={logo} alt={'logo'} className={'w-12 h-12'}/>
                <Button variant={'ghost'} className={'hover:shadow-amber-300'}>
                <Image src={user_icon} alt={'user'} className={'w-8 h-8'}/>
                </Button>
            </div>
        </div>
    );
};

export default Header;