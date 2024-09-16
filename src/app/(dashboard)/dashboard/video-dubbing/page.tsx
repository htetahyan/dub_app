import { redirect } from 'next/navigation'
import React from 'react'
import DubbingForm from '~/components/dashboard/AddNewVideo'
import { getCurrentUser } from '~/service/user.service'

const page = async() => {
  const user = await getCurrentUser()
  if(user?.isSubscribed===false){
    redirect('/dashboard/subscriptions')
  }
  return (
      <DubbingForm/>
  )
}

export default page
