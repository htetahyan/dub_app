import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import ProjectCard from "./ProjectCard";
export const RecentDubbing = ({ projects }:any) => {
    
    return (
      <div className='p-6 w-full lg:w-1/3'>
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