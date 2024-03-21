
import React from 'react';
import {Button} from "~/components/Button";
import {logout} from "~/service/user.service";
import {useRouter} from "next/navigation";
import {USER} from "~/db/schema/schema";

const Auth_Btn = ({user}: { user: USER }) => {
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
        <Button variant={user ? 'danger' : 'secondary'}  onClick={user ? logout : () => router.push('/login')} className={'w-full text-left mt-2'}>
            {user ? 'Logout' : 'Login'}
        </Button>
    );
};

export default Auth_Btn;
