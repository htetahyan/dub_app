import React from 'react'
import { getCurrentUser } from '~/service/user.service';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
const DashboardSidebar=dynamic(()=>import('./DashboardSidebar'),{ssr:false,loading:()=><div className='w-[20vw] h-screen'>
  <Loader2 className='animate-spin'/>
</div>})
const DashboardSideWrapper = async() => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken) 
    if(!user) redirect('/signin');
  return (
    <div className=''>
      <DashboardSidebar user={user}/>
    </div>
  )
}

export default DashboardSideWrapper
