import dynamic from 'next/dynamic'
import React from 'react'
import Header from '~/components/Header'
const AuthForm = dynamic(() => import('~/components/AuthForm'), )
const HeaderResponsive = dynamic(() => import('~/components/HeaderResponsive'), {  })
const page = () => {
  return (
    <><HeaderResponsive/>
    <div className="w-screen relative max-w-screen overflow-hidden   flex justify-center items-center">
        <AuthForm/>
      
    </div></>
  )
}

export default page
