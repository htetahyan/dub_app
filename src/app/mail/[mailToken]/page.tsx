import React from 'react'
import {prisma} from "~/utils/utils";
import PasswordResetForm from "~/components/PasswordResetForm";

const page = async({ params}: { params: { mailToken: string } }) => {
  if(!params.mailToken) return null
    const user=await prisma.user.findFirst({
        where:{
            emailVerifToken:params.mailToken as string

        }
    })
if(!user) return  <h1 className={'text-3xl text-center'}>invalid reset link! This links is either expired or invalid</h1> // <h1>{params.mailToken}</h1>
  return (
    <div className={'h-screen w-screen flex items-center justify-center'}>
      <PasswordResetForm id={user?.id as number}/>
    </div>
  )
}

export default page
