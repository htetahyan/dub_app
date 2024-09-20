import React from 'react'
import ContactForm from "~/components/ContactForm";

const page = () => {
  return (
    <div className={'flex flex-col gap-10 items-center justify-center h-screen w-[80vw]'}>
        <h1 className={'text-2xl font-bold'}>Get in touch with us</h1>
      <ContactForm/>
    </div>
  )
}

export default page
