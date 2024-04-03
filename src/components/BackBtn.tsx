'use client'
import React from 'react';
import Link from "next/link";

import {Button} from "~/components/Button";
import {useRouter} from "next/navigation";



const BackBtn = () => {
    const router = useRouter();
    const goHome = () => {
        router.push('/')
    }
    return (
        <Button onClick={goHome} className={'items-start w-fit mt-2 text-teal-400 border-teal-400'} variant={'link'}>Back</Button>
    );
};

export default BackBtn;
