import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { getCurrentUser } from '~/service/user.service';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
