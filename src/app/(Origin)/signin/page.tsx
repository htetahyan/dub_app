'use client'
import React from 'react';

import dynamic from 'next/dynamic';

const SignInForm=dynamic(()=>import('~/components/SignInform'),{ssr:false})
const Login =  () => {

    return (

          
                   <SignInForm/>



    );
};

export default Login;
