'use client'
import React from 'react';
import Link from "next/link";

import {Button} from "~/components/Button";
import {useRouter} from "next/navigation";



const BackBtn = () => {
    const router = useRouter();
    return (

        <Button onClick={()=> router.back()} className={'items-start w-fit'} variant={'link'}>Back</Button>


    );
};

export default BackBtn;
