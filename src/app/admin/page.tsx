import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import AdminDashboard from '~/components/admin/AdminDashboard'
import { getCurrentUser } from '~/service/user.service';
import { prisma } from '~/utils/utils';

const page = async({searchParams}:{searchParams:{page?:string}}) => {
  const token=  cookies().get('access_token')?.value as string
  if(!token) redirect('/signin')
const currentUser = await getCurrentUser(token)
if(!currentUser) return <div>Unauthorized or Token Expired! Please Signin again</div>
if(currentUser.email!=='htetahyan@gmail.com') return <div>Unauthorized</div>
const page = searchParams.page ? parseInt(searchParams.page) : 1
const count=await prisma.user.count()
const users=await prisma.user.findMany({skip:10*(page-1),take:6,orderBy:{createdAt:'desc'}
,select:{
  id:true,
  name:true,
  email:true,
  createdAt:true,
  credits:true,
  isSubscribed:true,
  isEmailVerified:true,
  subscriptions:{
    select:{
      credits:true,
      planName:true
    }
  }
}
})
const usersWithCredits=users.map((user)=>{
  return {
    ...user,
    credits:user.subscriptions[0]?.credits,
    planName:user.subscriptions[0]?.planName
  }
})

  return (
    <div className='w-full h-screen flex items-center justify-center' >
    { users &&  <AdminDashboard users={usersWithCredits} page={page} totalUsers={count}/>}
    </div>
  )
}

export default page
export const revalidate = 100