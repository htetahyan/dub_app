import React from 'react';
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";
import {Download, Play, Terminal} from "lucide-react";
import VerifyEmailAlert from "~/components/dashboard/VerifyEmailAlert";
import AddNewDubbing from '~/components/dashboard/AddNewDubbing';
import { ProjectCard } from '~/components/dashboard/ProjectCard';

const Page = async() => {
    const {projects} = await fetch(`http://localhost:3000/api/project?page=0&&limit=5`, {next: {revalidate: 0,
        tags: ['projects']
    }}).then(res => res.json())
    return (
        <div className={'p-  '}>
            {//<VerifyEmailAlert/>
            }
            
            <div className='flex w-[80vw] h-screen items-center justify-center gap-8  '>

            <AddNewDubbing/>
            <RecentDubbing projects={projects} />

</div>
        </div>
    );
};

export default Page;
export const RecentDubbing = ({ projects }:any) => {
    
    return (
      <div className='p-6 w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>Recent Dubbing Projects</h2>
        { projects?.length > 0 ?projects?.map((project: any) => (
          <ProjectCard key={project.id} project={project} />))
        : <Alert>
          <Terminal className="h-6 w-6" />
          <AlertTitle>No projects</AlertTitle>
          <AlertDescription>
            No projects found. Create a new project to get started.
            </AlertDescription>
        </Alert>
        }
      
      </div>
    );
  };
 