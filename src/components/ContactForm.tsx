'use client'

import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  Phone: Yup.string().nullable(),
  Message: Yup.string().required('Message is required').min(50, 'Message must be at least 50 characters')
  .max(300, 'Message must be less than 300 characters'),
})

function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      Phone: '',
      Message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className='w-full flex flex-col gap-4 mb-4'>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {fields.map((field) => (
            <div className={`flex flex-col gap-1 ${field.name === 'Message' ? 'lg:col-span-3 w-full' : 'lg:col-span-1'}`} key={field.name}>
              <label htmlFor={field.name} className='text-sm font-medium'>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                onChange={formik.handleChange }
                onBlur={formik.handleBlur}
                value={formik.values[field.name as keyof typeof formik.values]}
                className={`${formik.touched[field.name as keyof typeof formik.values] && formik.errors[field.name as keyof typeof formik.values] ? 'border-red-500' : ''} w-full min-h-10 border-0 outline-none border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 p-2`}
              />
              {formik.touched[field.name as keyof typeof formik.values] && formik.errors[field.name as keyof typeof formik.values] ? (
                <div className="text-red-600 font-secondary text-sm">{formik.errors[field.name as keyof typeof formik.values]}</div>
              ) : null}

              
          
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          type="submit"
          className={ ` w-fit    font-bold py-2 rounded mt-4`}
        >
          Send
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  )
}

export default ContactForm

const fields = [
  { label: 'Your Name', name: 'name', type: 'text' },
  { label: 'Your Email', name: 'email', type: 'email' },
  { label: 'Your Phone', name: 'Phone', type: 'text' },
  { label: 'Message', name: 'Message', type: 'text' },
]
