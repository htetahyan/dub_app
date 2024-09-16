import React from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const page = () => {
  return (
    <div className='w-full p-4 grid py-8'>
      <h1 className='font-bold text-2xl'>Profile Setting</h1>
      <p>Update your name associated with your account</p>
      <div className='flex flex-col gap-4 w-fit'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <Input placeholder='Name' />
        <Button variant={'default'} className='bg-secondary hover:bg-secondary/90'>Update</Button>
      </div>
      <div className='flex mt-8 flex-col gap-4 w-fit'>
        <h2 className='text-xl font-bold'>Reset password</h2>
        <p >Update your password by sending a reset link to the email associated with the account</p>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
       <div className=' w-fit'> <Input placeholder='Email' className='min-w-[300px]'/>
        <Button variant={'default'} className='bg-secondary mt-4 hover:bg-secondary/90'>Update</Button>
     
     </div> </div>
    </div>
  )
}

export default page
