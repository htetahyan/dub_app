'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from './ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { getGoogleOAuthURL } from '~/utils/getOAuthURL';
import Image from 'next/image';
import { BgSignin, google_icon, LogoWhite } from '~/assets/exporter';
import { useRouter } from 'next/navigation';
const SignInForm = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });
const router=useRouter()
  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async(values) => {
     toast.promise(
      new Promise(async(resolve, reject) => {
       const res=await fetch('/api/oauth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
       })
      const data=await res.json()
     
       
       if(res.ok){
        resolve(data.message)
router.push('/dashboard')
       }else{
        reject(data.message)
       }
      }),
      {
        loading: 'Logging in...',
        success:(text) => text as string,
        error: (text) => text as string,
      }
     )
    },
  });

  return (    <>    <div className=" w-screen grid lg:grid-cols-2 items-center h-screen z-10   bg-gray-100 text-black">
<div className='w-full place-content-center flex justify-center  z-10'>
    <div className='lg:w-2/3 w-full px-2  h-[25vh] flex flex-col justify-center '>
    <Image src={LogoWhite} alt="icon"  className='  w-32 h-fit  text-white' />
    <h1 className="lg:-5xl text-2xl font-bold  mt-4 text-white">
    Translate your video or audio with voice cloning.
    </h1></div>
</div>
    <div className="flex justify-center z-10 items-center  bg-gradient-to-r p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className=" text-lg lg:text-2xl  font-bold mb-4 text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-8">Please Enter Your Email & Password</p>
        <form onSubmit={formik.handleSubmit} >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Ex: abc.dubbya@gmail.com"
              className={`w-full px-4 py-2 border rounded-lg ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>

            <Input
              type="password"
              name="password"
              placeholder="Create password"
              className={`w-full px-4 py-2 border rounded-lg ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-blue-500 text-sm">
              Forget Password?
            </a>
            <label className="inline-flex items-center text-sm">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
              <span className="ml-2">Remember Me</span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors duration-600"
          >
            Sign In →
          </Button>
        </form>

        <div className="mt-4 text-center">
        <Button
          variant={'outline'}
          onClick={getGoogleOAuthURL}
          className="font-bold mx-auto mt-2 flex items-center justify-center text-caption text-black rounded-lg border border-gray-300 py-2 px-4"
        >
          <Image src={google_icon} alt="Google Sign In" className="w-6 h-6 mr-2" />
          Continue with Google
        </Button>
          <p className="text-sm mt-2">
            Don't Have an Account?{' '}
            <Link href="/signup" className="text-blue-500 font-bold">
              Create Account
            </Link>
          </p>
        </div>
      </div>

    </div></div>
          <Image src={BgSignin} alt="icon"  className='absolute object-cover top-0 lg:h-auto lg:w-auto h-screen z-0 pr-4 py-4 rounded-tr-[5rem] rounded-br-[5rem]' />

    </>
  );
};

export default SignInForm;
