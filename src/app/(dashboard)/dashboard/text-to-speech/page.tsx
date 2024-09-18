import { cookies } from 'next/headers'
import React from 'react'
import ProjectCard from '~/components/dashboard/ProjectCard'
import TTSForm from '~/components/dashboard/TTSForm'
import { getCurrentUser } from '~/service/user.service'
import { prisma } from '~/utils/utils'

const page = async() => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken)
    const ttsProjects=await prisma.dubbingProject.findMany({where:{user:{id:user?.id},projectType:'TTS'},take:5,orderBy:{createdAt:'desc'}})

  return (
    <div className='w-screen  overflow-x-hidden relative  min-h-screen  grid grid-cols-3 justify-center items-center bg-gray-100 px-6'>
        <TTSForm/>
    <div className='p-4 col-span-1'>
        <h1 className='text-3xl font-bold'>Recent TTS Projects</h1>
          {
        ttsProjects.map((project)=>(
            <ProjectCard key={project.id} project={project}/>
        ))
       }</div> 
      
    </div>
  )
}

export default page
