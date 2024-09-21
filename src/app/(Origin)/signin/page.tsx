import React from 'react';

import dynamic from 'next/dynamic';
import metaTag from '~/components/MetaTag';
import { Metadata } from 'next';

const SignInForm=dynamic(()=>import('~/components/SignInform'),{ssr:false})
export const metadata: Metadata =metaTag("Sign in to your Contentally account","Sign in")

const Login =  () => {

    return (

          
                   <SignInForm/>



    );
};

export default Login;
