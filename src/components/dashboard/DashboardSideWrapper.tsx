import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { getCurrentUser } from '~/service/user.service';
import { redirect } from 'next/navigation';

const DashboardSideWrapper = async() => {
    const user=await getCurrentUser()
    console.log(user,'user')
    if(!user) redirect('/signin');
  return (
    <div>
      <DashboardSidebar user={user}/>
    </div>
  )
}

export default DashboardSideWrapper
