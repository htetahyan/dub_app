import React from 'react';
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import { Terminal} from "lucide-react";
import AddNewDubbing from '~/components/dashboard/AddNewDubbing';
import { cookies } from 'next/headers';
import { getCachedProjects } from '~/service/server.service';
import { redirect } from 'next/navigation';
import { RecentDubbing } from '~/components/dashboard/RecentDubbing';
const Page = async() => {
   const token=  cookies().get('access_token')?.value as string
   if(!token) redirect('/login')
   const projects= await getCachedProjects(token)
  
    return (
        <div className={'p-  '}>
            {//<VerifyEmailAlert/>
            }
            
            <div className='lg:flex lg:w-[80vw] w-full h-screen items-center justify-center gap-8  '>

            <AddNewDubbing/>
            <RecentDubbing projects={projects ?? []} />

</div>
        </div>
    );
};

export default Page;
 export const dynamic = 'force-dynamic'