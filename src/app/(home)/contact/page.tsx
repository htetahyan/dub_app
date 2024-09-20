import Image from 'next/image'
import React from 'react'
import { Fb, Spiral, Star, Vector14 } from '~/assets/exporter'
import ContactForm from '~/components/ContactForm'

const Page = () => {
  return (
    <div className='h-fit flex justify-center items-center w-full'>
      <div className='w-full relative min-h-screen grid z-10'><div className='relative text-center'>
        <h1 className='lg:text-5xl relative  text-2xl font-secondary fontse'>
          Keep in touch <span className='relative inline-block'>with
            <Image
              src={Vector14}
              alt="icon"
              className='absolute inset-0 w-96 h-12 -translate-x-1/2 -translate-y-1/2'
              style={{ top: '50%', left: '50%' }} // Adjust as needed
            />
          </span> us
        </h1>
      <div className='flex justify-center flex-col lg:w-2/3 w-3/4 items-center mx-auto gap-10 mt-5 lg:mt-10 '> <p className='text-xl font-secondary w-1/2 break-words text-center  '>
      
        if you have any question or just want to know about our software , just say hello!</p>
        <div className='flex gap-4 '>
<Image src={Fb} alt="icon" className='w-12 h-auto 8'   />
<Image src={Fb} alt="icon" className='w-12 h-auto 8'   />
<Image src={Fb} alt="icon" className='w-12 h-auto 8'   />

        </div>
        <ContactForm/>
        </div> 
 </div>        <Image src={Spiral} alt="icon" className='w-20 top-4 h-auto absolute right-8'   />  
<div className='absolute left-16 top-0 z-0 h-10 w-10 bg-slate-500 rounded-full '/>
 <Image src={Star} alt="icon" className='w-20 h-auto absolute left-8 bottom-40'   />  
 <div className='w-full lg:flex justify-around'>
  <div className=''>
    <h2 className='text-xl '>Contact Info</h2>
    <h1 className='text-3xl  font-semibold'>We are here to assit you!</h1>
  </div>
  <div className='grid grid-cols-2 gap-6'>
   <div> <p className='text-sm font-semibold'>Email address : </p>
    <p className='text-sm '>4MxJd@example.com</p>
   </div><div> <p className='text-sm font-semibold'>Phone : </p>
    <p className='text-sm '>4MxJd@example.com</p>
   </div>
   <div> <p className='text-sm font-semibold'>Assistance Hours : </p>
    <p className='text-sm '>Monday - Friday 6 am to 8 pm EST</p>
   </div><div> <p className='text-sm font-semibold'>Email address : </p>
    <p className='text-sm '>Monday - Friday 6 am to 8 pm EST</p>
   </div>
  </div>
 </div>
    </div>
    </div>
  )
}

export default Page
