import { redirect } from 'next/navigation'
import React from 'react'
import { getCurrentUser } from '~/service/user.service'
import { prisma } from '~/utils/utils'
import { AudioPlayer} from '~/components/dashboard/Player' // New components
import dynamic from 'next/dynamic'
import {getVideoFromId} from "~/service/elevenlab.service";
import VideoPlayer from "~/components/dashboard/VideoPlayer";

const ProjectCard=dynamic(()=>import('~/components/dashboard/ProjectCard'),{ssr:false})
const page = async () => {
  const user = await getCurrentUser()
  if (!user) redirect('/signin')

  const dubbingProjects = await prisma.dubbingProject.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      dubbingId:true,
      name: true,
      createdAt: true,
      uploadType: true,
      creditCost: true,
      voice: true,
      durationMinutes: true,
      translateTo: true,
      currentLanguage: true,
      youtubeUrl: true,
      url: true,
      projectType: true
    }
  })


// Filter out null or unresolved promises

// Combine with existing projects and remove duplicates



  return (
    <div className='w-full p-4 py-8'>
      <h1 className='font-bold text-3xl mb-4'>My Projects</h1>
      <p className='text-gray-600 mb-6'>Here are your projects</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {dubbingProjects?.map((project:any, i) => (
          <div key={i} className='relative w-full h-fit  rounded-lg overflow-hidden shadow-lg'>
            <div className='flex justify-center items-center h-fit'>
              {project.projectType === 'ATA' ? (
                <ProjectCard project={project} />
              ) : (
                <VideoPlayer project={project} />
              )}
            </div>
        
       
          </div>
        ))}
      </div>
    </div>
  )
  
}

export default page
