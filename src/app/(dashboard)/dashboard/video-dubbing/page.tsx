import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import DubbingForm from '~/components/dashboard/AddNewVideo'
import { getCurrentUser } from '~/service/user.service'

const page = async() => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken)
    if(user?.isSubscribed===false){
    redirect('/dashboard/subscriptions')
  }
  return (
      <DubbingForm/>
  )
}

export default page
