'use client'
import React from 'react'
import { Alert } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Check, Terminal, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import useSWRMutation from 'swr/mutation'
import { toast } from 'sonner'

const Settings = ({ user }: { user: any }) => {
  const { trigger, isMutating, data, error } = useSWRMutation('/api/oauth/email', async (url, { arg }) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
  const [name,setName]=React.useState(user?.name)

  const sendVerificationEmail = async () => {
    const res = await trigger()
    if (isMutating) toast.loading('Sending email...')

    setTimeout(() => {
      toast.dismiss()
    }, 3000)

    if (res.status === 200) {
      toast.success('Verification email sent successfully')
    } else {
      const msg = await res.json()
      toast.error(msg.message as string)
    }
  }
 const passwordReset=async()=>{
  await sentPasswordResetLink(user?.email)
 }
  const nameChange = async () => {

    if(name.length===0) toast.warning("name cannot be empty");
    toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            // Example of an API request (adjust accordingly to your API)
            const response = await fetch('/api/name', {
              method: 'POST',
              body: JSON.stringify({ name }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
const res=await response.json()
            // Check if the response is OcK (status code 200–299)
            if (response.ok) {
              resolve(res.message);
            } else {
              // You can throw an error if the response is not OK
              throw new Error(res.message);
            }
          } catch (error:any) {
            reject(error.message || 'Something went wrong');
          }
        }),
        {
          loading: 'changing name..',
          success: (msg:any) => toast.success(msg ?? 'Name changed successfully'),
          error: (msg:any) => toast.success(msg ?? 'Cannot change name right now'),
        }
    );
  };
  return (
    <div className='w-[90vw]  h-screen mx-auto p-8 bg-white shadow-lg rounded-xl flex flex-col items-center justify-start'>
      <header className='mb-6 text-center'>
        <h1 className='text-4xl font-bold text-gray-900'>Profile Settings</h1>
        <p className='text-gray-600'>Manage your profile and account settings.</p>
      </header>

      {/* User Info Section */}
      <section className='mb-8 w-full'>
        <div className='flex items-center gap-4 mb-6 w-full justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className='text-lg text-gray-900 font-semibold'>{user?.name}</p>
          </div>
          <p className='text-gray-500'>{user?.email}</p>
        </div>

        {/* Email Verification */}
        <div className='flex items-center gap-4 mb-6 w-full'>
          {user?.isEmailVerified ? (
            <div className='flex items-center gap-2 text-green-600'>
              <Check className='w-6 h-6' />
              <span className='font-semibold'>Account verified</span>
            </div>
          ) : (
            <div className='flex items-center justify-between gap-4 p-4 bg-red-50 border border-red-300 rounded-lg w-full'>
              <div className='flex items-center gap-2 '>
                <Terminal className='w-5 h-5 text-red-500' />
                <p className='text-red-500 font-medium italic'>Verify your email to fully access the platform.</p>
              </div>
              <Button variant='secondary' className='w-fit text-white bg-red-500 hover:bg-red-600' onClick={sendVerificationEmail} disabled={isMutating}>
                {isMutating ? <Loader2 className='animate-spin' /> : 'Verify'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Update Username Section */}
      <section className='mb-8 w-full'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Update Username</h2>
        <div className='flex flex-col gap-4'>
          <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
          <Input onChange={(e:any) => setName(e.target.value)}  value={name} placeholder='Enter your new username' className='border-gray-300 w-1/3 shadow-sm focus:ring-blue-500 focus:border-blue-500' />
          <Button variant='default' onClick={nameChange} className='bg-blue-600 hover:bg-blue-700 w-fit text-white'>
            Update
          </Button>
        </div>
      </section>

      {/* Reset Password Section */}
      <section className='w-full'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Reset Password</h2>
        <p className='text-gray-600 mb-4'>Send a reset link to the email associated with your account.</p>
        <div className='flex flex-col gap-4'>
          <Button variant='destructive' onClick={passwordReset} disabled={isMutating} className='text-white w-fit'>
          {isMutating ? <Loader2 className='animate-spin' /> : 'sent password reset link'}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Settings
export const sentPasswordResetLink = async (mail:string) => {
  if(mail==='' || mail===null || mail===undefined) toast.warning("no mail detect");
  toast.promise(
    new Promise(async (resolve, reject) => {
      try {
        // Example of an API request (adjust accordingly to your API)
        const response = await fetch('/api/oauth/email/reset-password', {
          method: 'POST',
          body: JSON.stringify({ email:mail }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
const res=await response.json()
        // Check if the response is OK (status code 200–299)
        if (response.ok) {
          resolve(res.message);
        } else {
          // You can throw an error if the response is not OK
          throw new Error(res.message);
        }
      } catch (error:any) {
        reject(error.message || 'Something went wrong');
      }
    }),
    {
      loading: 'Sending password reset link...',
      success: (msg:any) => msg,
      error:  (msg:any) => msg,
    }
  );
};