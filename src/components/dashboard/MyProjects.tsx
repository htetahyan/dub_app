'use client'
import React from 'react'
import dynamic from 'next/dynamic'

import PaginationProjects from '~/components/dashboard/PaginationProjects'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import VideoPlayer from './VideoPlayer'
import useSWR from 'swr'
import {Loader, Loader2} from "lucide-react";
import Footer, { UnderFooter } from '../Footer'
const ProjectCard=dynamic(()=>import('./ProjectCard'))
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const MyProjects = ({dubbingProjects}: any) => {
const [page, setPage] = React.useState(1);
  const { data,isLoading } = useSWR(`/api/project/get?page=${page}`, fetcher,{
    fallbackData:dubbingProjects
  });
  console.log(data?.totalProjects,';;;;;')
  return (
    <div className='w-fit  p-4 py-8 h-fit overflow-hidden '>
    <h1 className='font-bold text-3xl mb-4'>My Projects</h1>
    <p className='text-gray-600 mb-6'>Here are your projects</p>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {data?.projects?.length === 0 && (
        <div className='flex flex-col mx-auto lg:col-span-3 col-span-2 items-center justify-center w-full h-full text-center p-6'>
    <Alert>
      <AlertTitle>No projects found</AlertTitle>
      <AlertDescription>
        You have not created any projects. Create one now
      </AlertDescription>
      </Alert>
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-screen lg:w-[70vw] place-content-center bg-white'>
        {isLoading && <Loader2 className='animate-spin'/>} {data!.projects?.map((project: any, i: any) => (
        <div key={i} className='relative w-full h-full rounded-lg overflow-hidden shadow-lg'>
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
   <div className='mt-8 w-full mx-0 flex justify-start lg:justify-center'>
    <PaginationProjects setPage={setPage} page={page} totalProjects={  data?.totalProjects}/></div>
    <UnderFooter/>
  </div>
  )
}

export default MyProjects
