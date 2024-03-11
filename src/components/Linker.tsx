import React from 'react';
import {Button} from "~/components/Button";
import Link from "next/link";
import Image from "next/image";

const Linker = ({text,url,iconPath}: { text: string, url: string, iconPath: string }) => {
    return (
        <Link href={url}>
        <Button variant={'secondary'} className={'hover:shadow-amber-500 flex items-center'} >
            {text}
            <Image src={iconPath} alt={''} className={'w-8 h-8 transition-all -rotate-45 duration-200 '} />
        </Button>
        </Link>
    );
};

export default Linker;