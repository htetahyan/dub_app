// components/AuthForm.js
'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from "~/components/ui/button";
import { getGoogleOAuthURL } from "~/utils/getOAuthURL";
import Image from "next/image";
import { google_icon } from "~/assets/exporter";
import { Input } from './ui/input';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

// Handle form submission
const inputs=[{
    name:"name",
    type:"text",
    placeholder:"Name"
},{
    name:"email",
    type:"email",
    placeholder:"Email"
},{
    name:"password",
    type:"password",
    placeholder:"Password"
},{
    name:"confirmPassword",
    type:"password",
    placeholder:"Confirm Password"
}]
// AuthForm Component
const AuthForm = () => {
  const router=useRouter()
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      },
      validationSchema,
      onSubmit: async(values: any) => {
        console.log(values);
        
        // Handle form submission
         const res=await fetch('/api/signup', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(values),
         })
         if(res.ok){
            toast.success('Account created successfully')
            router.push('/dashboard')
            
         }
         toast.error('Something went wrong')
      },
    });
  
    return (
      <div className="w-1/3 max-w-md justify-self-center bg-white  "> 
        <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-center text-gray-500 mb-4">Let's create an account to enter into Dubby AI Dashboard.</p>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          {inputs.map((input) => (
            <div key={input.name} className="mb-1.5">
              <label
                htmlFor={input.name}
                className="block text-sm font-medium text-gray-700"
              >
                {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
              </label>
              <Input
                autoComplete="off"
                name={input.name}
                type={input.type}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[input.name]}
                className={`mt-1 block w-full p-2 border rounded-md ${
                  formik.errors[input.name] && formik.touched[input.name]
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.errors[input.name] && formik.touched[input.name] && (
                <p className="text-red-500 text-sm mt-1 w-full break-words">
                  {/* Added w-full and break-words */}
                  {formik.errors?.[input.name] as string}
                </p>
              )}
            </div>
          ))}
  
          <Button
            color="default"
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/80 text-white p-2 rounded-md  mt-2"
          >
            Create account
          </Button>
        </form>
  <p className=' text-md font-medium text-center mt-2   '>OR</p>
        {/* Google Sign-In Button */}
        <Button
          variant={'outline'}
          onClick={getGoogleOAuthURL}
          className="font-bold mx-auto mt-2 flex items-center justify-center text-caption text-black rounded-lg border border-gray-300 py-2 px-4"
        >
          <Image src={google_icon} alt="Google Sign In" className="w-6 h-6 mr-2" />
          Continue with Google
        </Button>
  
        <p
          className="text-center mt-6 flex gap-2 text-gray-500"
        >
          Have an Account? <Link           href="/signin"
className="text-secondary hover:text-secondary/35  font-bold">Signin</Link>
        </p>
      </div>
    );
  };
  
  export default AuthForm;
  