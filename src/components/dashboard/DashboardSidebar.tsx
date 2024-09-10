import Image from 'next/image'
import React from 'react'
import { Bag, DriveUpload, PlusIcon, MenuOpen, Speak, Tune,Logout } from '~/assets/exporter'
import { Button } from '../ui/button'
import { Accordion, AccordionContent, AccordionTrigger } from '../ui/accordion'
import { AccordionItem } from '@radix-ui/react-accordion'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCurrentUser } from '~/service/user.service'
import { redirect } from 'next/navigation'


const DashboardSidebar = async() => {
  const user=await getCurrentUser()
  if(!user) redirect('/login');
  return (
    <div className='w-[20vw] p-2 sticky top-0 overflow-hidden'>
      <div className='w-full flex items-center justify-between p-4 '>
        <h1 className='font-bold text-2xl'>Dashboard</h1>
        <Image src={MenuOpen} alt="Menu opener" className='w-8 h08' />
      </div>
      <div className='w-full h-[1px] bg-gray-200'/>
      <DashboardAvatar/>
      <div className='w-full mt-4 h-[1px] bg-gray-200'/>
<Link href={'/dashboard'}>
      <Button variant={'ghost'} className='h-16  w-fit mx-auto mt-2 text-lg   flex items-center justify-start gap-4 font-semibold '>
        <Image src={PlusIcon} alt='Menu opener' className='h-6 w-6 '/>
        Add New Dubbing
      </Button>
      </Link>
      <div className='w-full mt-2 flex justify-center'>
      <Accordion className='w-4/5  ' type="single" collapsible>
        <AccordionItem className='' value="item-1">
          <AccordionTrigger className='text-gray-500'> Dashboards</AccordionTrigger>
         {
            dashboardLinks.map((dashboard,i)=>(
               <Link key={i} href={'/dashboard'+dashboard.path}> <AccordionContent   className='w-full '>
                    <Button variant={'ghost'} className='h-16 w-full mx-auto my-0 text-md   flex items-center justify-start gap-4 font-semibold '>
        <Image src={dashboard.icon} alt="Menu opener" className='h-6  w-6 '/>
        {dashboard.name}
      </Button>
                </AccordionContent></Link>
            ))
         }
          </AccordionItem>
        </Accordion>
        </div>
        <div className='w-full mt-4 h-[1px] bg-gray-200'/>
<Button  variant={'default'} className='h-16 w-4/5 mx-auto mt-4 text-md bg-danger hover:bg-danger/80   flex items-center justify-start gap-4 font-semibold '>
        <h2 className='h-6 text-white rounded-full w-6 flex items-center justify-center  bg-secondary'>+</h2>
        Add New Dubbing
      </Button>
      
    </div>
  )
}

export default DashboardSidebar

const dashboardLinks=[{
    name:"My projects",
    path:"/my-projects",
    icon: DriveUpload
},
{
    name:"Subscriptions",
    path:"/subscriptions",
    icon:Bag
},{
    name:"Profile Setting"
    ,path:"/settings",
    icon:Tune
},{
    name:"Support",
    path:"/Support",
    icon:Speak
}
]
export const DashboardAvatar=()=>{
    return (
        <div className='w-full flex items-center justify-around px-4 mt-4'>
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        
      </Avatar> 
      <div>
      <h1 className='font-semibold text-xl'>shadcn</h1>
      <p className='text-secondary'>0 Credit left</p>
      </div>
       </div>  )
}