'use client'
import React from 'react';
import {Button} from "~/components/Button";
import Link from "next/link";

const Error = ({error, reset}: {error: Error; reset: () => void}) => {
    return (
        <div className={'w-full h-screen gap-2 flex justify-center items-center'}>
            <h1>{error.message}</h1>
            <Button variant={'secondary'} onClick={() => reset()}>Try Again</Button>
<Link href={'/'}><Button variant={'success'}>Go Home</Button></Link>
        </div>
    );
};

export default Error;