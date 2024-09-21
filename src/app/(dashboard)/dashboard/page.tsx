import React from 'react';
import {cookies} from "next/headers";
import {getCurrentUser} from "~/service/user.service";
import {redirect} from "next/navigation";

const Page = async () => {
   const token=  cookies().get('access_token')?.value as string
    const user= await getCurrentUser(token)
    if(user===null) redirect('/signin')
    else redirect('/dashboard/my-projects')

};

export default Page;