// AudioPlayer.js
'use client'
import React, {useEffect, useState} from 'react'
import Audio from 'react-audio-player'
import { Download } from 'lucide-react'

export const AudioPlayer = ({ url }: { url: string }) => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Audio
        src={url}
        controls
        style={{ width: '100%' }}
      />
      <button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
        <Download className='w-6 h-6 mr-2' /> Download
      </button>
    </div>
  )
}


// VideoPlayer.js



