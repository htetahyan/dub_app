'use client'

import { Download } from 'lucide-react'
import { Button } from '../ui/button'
import React from 'react'

export const DownloadButton = ({ url, project }: { url: string ,project:any}) => {
  const [open, setOpen] = React.useState(false)
    const downloadMp3=async()=>{
      const res=await fetch(url, {
        method: 'GET',
        headers: {
        },
      })
      const blob=await res.blob()
const newBlob=new Blob([blob],{
  type:'audio/mpeg'
})
      const durl=URL.createObjectURL(newBlob)
      const a = document.createElement('a')
      a.href = durl
      a.download = `${project.name}.mp3`
      document.body.appendChild(a)
      a.click()
      setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
      }, 100)

      /* 
         
          const a = document.createElement('a');
          a.href = url;
          a.download = `${project.name}.mp3`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
          }, 100); */
      
      }
    return (/*  <div className="flex justify-end">
      <a href={audioUrl} download>
        <Download className="h-5 w-5 text-gray-600" />
      </a>
    </div>
        <button  onClick={downloadMp3} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            <Download className='w-6 h-6 mr-2' /> Download mp3
        </button> */
        <div className='relative flex gap-2 items-center'>
                         <a href={url} download={`${project.name}.wav`}> <Button  className='w-fit h-fit'> <Download/> Wav</Button></a> 

            <Button onClick={downloadMp3} className='w-fit h-fit'> <Download/> Mp3</Button> 
          
        </div>
    )
}