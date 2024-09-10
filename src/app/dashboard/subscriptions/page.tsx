import React from 'react'
import Subscriptions from '~/components/home/Subscriptions'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card'

const page = () => {
  return (
    <div className='w-full h-full relative overflow-hidden p-8 '>
        <h1 className='font-bold text-2xl'>Subscriptions</h1>
        <Card className='mt-4 w-2/3'>
           <div className='w-full flex items-center justify-between '> <CardHeader className='w-fit '>
                <h2 className='text-xl w-fit font-bold'>current plan</h2>
                <p className='text-secondary w-fit text-md'>Free trial</p>
            </CardHeader>
          <CardHeader className='w-fit '>  <Button variant={'default'} className='bg-default hover:bg-default/90'>Subscribe</Button>
          </CardHeader>
</div>
            <CardContent >
                <h3 className='text-xl font-bold'>credits</h3>
                <p  className='text-secondary'>0 credits</p>
            </CardContent>
            </Card>
        <p className='text-gray-500  mt-2'>Purchase credits or subscribe to a plan for move savings.</p>
       <div className='w-full bg-gray-200'>
       <Subscriptions/></div> 
      
    </div>
  )
}

export default page
