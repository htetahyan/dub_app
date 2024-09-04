'use client'
import React from 'react';
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {Button} from "~/components/ui/button";
import {verifyEmail} from "~/service/user.service";

const VerifyEmailAlert = () => {

    return (

            <Alert variant={'destructive'}>

                <AlertTitle >Account not verified</AlertTitle>
                <AlertDescription>
                    please verified your email
<Button onClick={verifyEmail}>Verify Email</Button>
                </AlertDescription>
            </Alert>
    );
};

export default VerifyEmailAlert;