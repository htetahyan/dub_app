import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import Header from '~/components/Header'
import metaTag from '~/components/MetaTag'
const AuthForm = dynamic(() => import('~/components/AuthForm'), )
const HeaderResponsive = dynamic(() => import('~/components/HeaderResponsive'), {  })
export const metadata: Metadata =metaTag("Create your Contentally free account","Sign up")

const page = () => {
  return (
    <><HeaderResponsive/>
    <div className="w-screen relative max-w-screen overflow-hidden   flex justify-center items-center">
        <AuthForm/>
      
    </div></>
  )
}

export default page
