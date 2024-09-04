'use client'
import React from 'react';
import {Button} from "~/components/ui/button";
import {useRouter} from "next/navigation";

const Auth_Btn = ({user}: { user: any }) => {
    const router=useRouter()
const logout = async () => {
    try {
         await fetch('/api/logout', {method: 'POST'});
   router.refresh()
    } catch (e) {
        throw new Error("Failed to (Auth)")
    }
}
    return (
        <Button variant={user ? 'default' : 'outline'}  onClick={user ? logout : () => router.push('/login')} className={'w-full text-left mt-2'}>
            {user ? 'Logout' : 'Login'}
        </Button>
    );
};

export default Auth_Btn;
