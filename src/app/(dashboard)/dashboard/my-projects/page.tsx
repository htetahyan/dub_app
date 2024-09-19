import { redirect } from 'next/navigation'
import React from 'react'
import { getCurrentUser } from '~/service/user.service'
import { prisma } from '~/utils/utils'
import dynamic from 'next/dynamic'
import VideoPlayer from '~/components/dashboard/VideoPlayer'
import Image from 'next/image'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { cookies } from 'next/headers'

const ProjectCard = dynamic(() => import('~/components/dashboard/ProjectCard'), { ssr: false })

const page = async () => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken)
  if (!user) redirect('/signin')

  const dubbingProjects = await prisma.dubbingProject.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      dubbingId: true,
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

  return (
    <div className='w-fit  p-4 py-8'>
      <h1 className='font-bold text-3xl mb-4'>My Projects</h1>
      <p className='text-gray-600 mb-6'>Here are your projects</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dubbingProjects?.length === 0 && (
          <div className='flex flex-col mx-auto lg:col-span-3 col-span-2 items-center justify-center w-full h-full text-center p-6'>
      <Alert>
        <AlertTitle>No projects found</AlertTitle>
        <AlertDescription>
          You have not created any projects. Create one now
        </AlertDescription>
        </Alert>
          </div>
        )}
        <div className='grid grid-cols-4 gap-4 w-[70vw] place-content-center bg-white'>
        {dubbingProjects?.map((project: any, i) => (
          <div key={i} className='relative w-full h-fit rounded-lg overflow-hidden shadow-lg'>
            <div className='flex justify-center items-center  w-full'>
              {project.projectType === 'ATA' || project.projectType === 'TTS' ? (
                <ProjectCard project={project} />
              ) : (
                <VideoPlayer project={project} />
              )}
            </div>
          </div>
        ))}</div>
      </div>
    </div>
  )
}

export default page
