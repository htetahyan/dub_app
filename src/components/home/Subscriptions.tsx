import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Subscriptions = () => {
  return (
    <div className='w-full h-fit mt-10'>
    <h1 className='text-3xl font-bold text-center'>Pricing Plans</h1>
    <p className='text-gray-500 text-center mt-2'>Don't just take our word for it, see what our customers have to say!</p>
    <div className='w-full flex items-center justify-center mt-20'>
 <div className='w-2/3  items-center grid grid-cols-3 gap-x-5'>   {planCards.map((card,i)=>(
<div key={card.name} className={`w-full h-fit rounded-lg p-2 flex items-center flex-col gap-4 ${i===1 ? 'bg-black text-white' :"bg-[#F5F5F5] "}` }>
{i==1 && <p className='text-xl font-bold bg-[#6557FF]  flex justify-center items-center h-16 w-16 rounded-full'>-30%</p>}
<h3 className='text-xl font-bold text-center'>{card.name}</h3>
<p className=''>{card.price}</p>
<div className='w-full flex flex-col gap-4'>
{card.features.map((feature)=>(
<div className='flex items-center gap-2'><Input type='checkbox' checked className=' pointer-events-none bg-primary w-4 h-4 rounded-full p-2 '/> <p key={feature} className=''>{feature}</p>    
</div>
))}
</div>
<Button variant={'default'} className='bg-default hover:bg-default/90'>Subscribe</Button>
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
        name:"Personal",
        price:"5/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],

    },
    {
        name:"Business",
        price:"20/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],
    },
    {
        name:"Enterprise",
        price:"100/credit",
        features:[
            'Create personal dashboard',
            "Organize your notes and workflows",
            "5GB storage",
        ],
    },
]