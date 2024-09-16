"use client";

import React from 'react';
import { Button } from "~/components/ui/button";
import Link from "next/link";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 px-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                Oops! Something went wrong.
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Please refresh the page or contact the developer: 
                <a 
                    href="mailto:comapy@gmail.com" 
                    className="text-blue-600 underline ml-2"
                >
                    comapy@gmail.com
                </a>
            </p>
            <div className="flex space-x-4">
                <Button variant="secondary" onClick={reset}>
                    Try Again
                </Button>
                <Link href="/">
                    <Button variant="default">
                        Go Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
