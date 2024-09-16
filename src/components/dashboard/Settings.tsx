'use client'
import React from 'react'
import { Alert } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Check, Terminal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'

const Settings = ({user}:{user:any}) => {
    const {trigger,isMutating,data,error}=useSWRMutation('/api/oauth/email', async (url, { arg }) => {
        return await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
       
        })
    })
    const sendVerificationEmail = async () => {
    const res=    (await trigger());
        isMutating && toast.loading('Email sent successfully');
        
        setTimeout(() => {
            toast.dismiss();
          }, 3000);
          if(res.status===200){
            toast.success('Email sent successfully');
          }
          else{
            const msg=await res.json();
            toast.error(msg!.message as string);
          }
    }
  return (
    <div className='w-[90vw] max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-l h-fit'>
    <header className='mb-6'>
      <h1 className='text-3xl font-bold text-gray-900'>Profile Settings</h1>
      <p className='text-gray-600'>Update your profile information and manage your account.</p>
    </header>
    
    <section className='mb-6 w-full'>
      <div className='flex items-center gap-4 mb-4 w-full justify-between'>
<div className='flex items-center gap-2'><Avatar>
    <AvatarImage src={user?.picture} alt={user?.name} />
    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>

</Avatar>
<p className='text-gray-900 font-semibold'>{user?.name}</p>
</div>
        <p className='text-gray-500'>{user?.email}</p>
      </div>

      <div className='flex items-center gap-4 mb-6 w-full'>
        {user?.isEmailVerified ? (
          <div className='flex items-center gap-2 text-green-600'>
            <Check className='w-6 h-6' />
            <span className='font-semibold'>Account verified</span>
          </div>
        ) : (
          <div  className='flex items-center justify-around gap-2 p-2 border-collapse border-2 border-red-500 rounded-lg w-full'>
           <div className='flex items-center gap-2'> <Terminal className='w-5 h-5' />
            <p className='text-red-500 font-semibold italic'>Verify your email for subscriptions and using the platform</p></div>
            <Button variant='secondary' className=' w-fit text-white' onClick={sendVerificationEmail} disabled={isMutating}>
              Verify
              <Check/>
            </Button>
          </div>
        )}
      </div>
    </section>

    <section className='mb-8'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Update Username</h2>
      <div className='flex flex-col gap-4'>
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Username</label>
        <Input placeholder='Enter your new username' className='border-gray-300 shadow-sm' />
        <Button variant='default' className='bg-blue-600 hover:bg-blue-700 text-white'>
          Update
        </Button>
      </div>
    </section>

    <section>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Reset Password</h2>
      <p className='text-gray-600 mb-4'>Send a reset link to the email associated with your account to update your password.</p>
      <div className='flex flex-col gap-4'>
        <Button variant='secondary' className=' text-white w-fit mx-0'>
          Send Reset Link
        </Button>
      </div>
    </section>
  </div>
  )
}

export default Settings
