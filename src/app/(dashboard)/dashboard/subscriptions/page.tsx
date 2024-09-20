import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import Subscriptions from '~/components/home/Subscriptions'
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card'
import { extractUserIdFromToken } from '~/service/jwt.service'
import { getCurrentPricing } from '~/service/server.service'
import { getCurrentUser } from '~/service/user.service'

const page = async() => {
  const accessToken=cookies().get('access_token')?.value

  const user = await getCurrentUser(accessToken)
   if(!user?.isEmailVerified){


  redirect('/dashboard/settings')
 }
  const pricing=await getCurrentPricing(user?.id);

  
  return (
    <div className='w-full h-fit relative overflow-hidden p-8 '>
        <h1 className='font-bold text-2xl'>Subscriptions</h1>
        <Card className='mt-4 w-full lg:w-2/3'>
           <div className='w-full flex items-center justify-between '> <CardHeader className='w-fit '>
                <h2 className='text-xl w-fit font-bold'>current plan</h2>
                <p className='text-secondary w-fit text-md'>{ pricing?.planName ?? 'free plan'}</p>
            </CardHeader>
        
</div>
            <CardContent >
                <h3 className='text-xl font-bold'>credits</h3>
                <p  className='text-secondary'>{pricing?.credits}</p>
            </CardContent>
            </Card>
        <p className='text-gray-500  mt-2'>Purchase credits or subscribe to a plan for move savings.</p>
       <div className='w-full '>
       <Subscriptions/></div> 
      
    </div>
  )
}

export default page
