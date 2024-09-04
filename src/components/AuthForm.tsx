// components/AuthForm.js
'use client'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "~/components/ui/button";
import { getGoogleOAuthURL } from "~/utils/getOAuthURL";
import Image from "next/image";
import { google_icon } from "~/assets/exporter";

// Validation schema using Yup
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

// Handle form submission
const handleSubmit = (values) => {
    console.log('Register:', values);
};
const inputs=[{
    name:"username",
    type:"text",
    placeholder:"Username"
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
const AuthForm = () => {
    return (
        <div className="max-w-md p-4 mx-auto  border border-gray-200 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
            <p className="text-center text-gray-500 mb-6">Let's create an account to enter into Dubby AI Dashboard.</p>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '', username: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    {/* Username Field */}
                    <div className="mb-4">
                       {inputs.map((input)=>(
                        <div key={input.name} className="mb-2">
                            <label htmlFor={input.name} className="block text-sm font-medium text-gray-700">{input.name}</label>
                            <Field name={input.name} type={input.type} className="mt-1 block w-full p-2 border rounded-md" />
                        </div>
                       ))}
                    </div>

                  

                    {/* Register Button */}
                    <Button color='primary' type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mb-4">
                        Create account
                    </Button>
                </Form>
            </Formik>

            {/* Google Sign-In Button */}
            <Button
                variant={'outline'}
                onClick={getGoogleOAuthURL}
                className="font-bold mt-4 flex items-center justify-center text-caption text-black rounded-lg border border-gray-300 py-2 px-4"
            >
                <Image src={google_icon} alt="Google Sign In" className="w-6 h-6 mr-2" />
                Continue with Google
            </Button>

            {/* Login Link */}
            <p className="text-center mt-6 text-gray-500">
                Have an Account? <a href="#" className="text-blue-500 underline">Login</a>
            </p>
        </div>
    );
};

export default AuthForm;
