'use client'
import React from 'react';
import {Button} from "~/components/ui/button";
import Link from "next/link";

const Error = ({error, reset}: {error: Error; reset: () => void}) => {
    return (
        <div className={'w-full h-screen gap-2 flex justify-center items-center'}>
            <h1>Something went wrong!
            please refresh the page or connect the developer : htetahyan@gmail.com
            </h1>
            <Button variant={'secondary'} onClick={() => reset()}>Try Again</Button>
<Link href={'/'}><Button variant={'default'}>Go Home</Button></Link>
        </div>
    );
};

export default Error;