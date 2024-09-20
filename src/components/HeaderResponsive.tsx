import React from 'react';
import {cookies} from "next/headers";
import {getUserProfile} from "~/service/server.service";
import dynamic from "next/dynamic";
import {Loader2} from "lucide-react";
const Header=dynamic(()=>import('~/components/Header'),{ssr:false,loading:()=><Loader2 className={'animate-spin'}/>})
const HeaderResponsive = async() => {
    const token = cookies().get('access_token')?.value;
    const user = await getUserProfile(token as any) ??null;

    return (
       <Header user={user ?? {}}/>
    );
};

export default HeaderResponsive;