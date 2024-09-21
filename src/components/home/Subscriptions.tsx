'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import {toast} from "sonner";

const Subscriptions = ({user}:any) => {

    const router=useRouter()
    const goToPayment=async(priceId:string,price:number)=>{
        toast.loading('Redirecting to payment gateway...',{duration:3000})
        if(!user || user===undefined) { 
            router.push('/signin')}
        else {
    const res=await fetch('/api/stripe',{
            method:'POST',
            body:JSON.stringify({priceId,price})
        })
        const data=await res.json()
        toast.dismiss()
if(data?.url){
    window.location.href=data.url
}   
if(data.message) toast.success(data.message!)
    }
    }
  return (
    <div className='w-full h-fit mt-5'>

   
    <div className='w-full flex items-center justify-center mt-20'>
 <div className='lg:w-2/3  w-full items-center lg:grid grid-cols-3 gap-2 gap-x-5'>   {planCards.map((card,i)=>(
<div key={card.name} className={`w-full h-fit rounded-lg p-2 flex items-center flex-col gap-4 ${i===2 ? 'bg-black text-white' :"bg-[#F5F5F5] "}` }>
<h3 className='text-xl font-bold text-center'>{card.name}</h3>
<p className=''>{card.price}</p>
<div className='w-full flex flex-col gap-4'>
{card.features.map((feature,i)=>(
<div key={i} className='flex items-center gap-2'><Input type='checkbox' defaultChecked  className=' pointer-events-none bg-primary w-4 h-4 rounded-full p-2 '/> <p key={feature} className=''>{feature}</p>    
</div>
))}
</div>
<Button variant={'default'} onClick={async()=>{
  i===2?router.push('/contact') : await goToPayment(card.priceId as string,card.IntPrice as number)
}} className='bg-default hover:bg-default/90'>{i==2?'contact':'subscribe'}</Button>
</div>
))}</div>
    </div>
    {//undersection

    }
    
</div>
  )
}

export default Subscriptions

const planCards=[
    {
        name:"Pay Once",

        price:"5usd/50000 credit",
        IntPrice:5,

        features:[
            'TTS -50000 words (~50min)',
            "Credit never expires",
            "1 concurrent dubbing Job",
        ],
        priceId:'price_1PyWQmJM8edFj1dH4lKM99go'

    },
    {
        name:"Premium",
        price:"17usd/ 200000credits",
        IntPrice:17,

        features:[
            'TTS -200minutes (or) Speech to speech (Dubbing) ',
            "Organize your notes and workflows",
            "Unused credits rollover",
            "3 concurrent dubbing Jobs",
            "More Premium voices for TTS",
        ],
        priceId:'price_1PyWQmJM8edFj1dH4lKM99go'
    },
    {
        name:"Custom",
        price:"Contact us",
        features:[
            'special discount',
            "Api access for everything",

            "Priority support",
        ],
    },
]