import {  Play } from "lucide-react";
import { DownloadButton } from "./DownloadButton";

 const ProjectCard = ({ project }: any) => {
    const audioUrl = `${process.env.AZURE_BLOB_URL}/${project.url}`;

    return (
      <div className='border mt-2 p-4 rounded-md bg-gray-100 w-full'>
        <div className='flex flex-col gap-2'>
          {/* Play button and audio element */}
          <div className="flex items-center gap-2">
            <Play className="h-6 w-6 text-gray-600" />
            <audio controls className="h-6 flex-1" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
  
          {/* Project details */}
          <div className='flex flex-col'>
            <h3 className='font-semibold text-sm'>{project.name}</h3>
            <p className='text-xs text-gray-500'>
              {project.translateTo} - {new Date(project.createdAt).toLocaleString()}
            </p>
          </div>
  
          {/* Download button */}
         
          <DownloadButton url={audioUrl} project={project}/>
        </div>
      </div>
    );
  };
export default ProjectCard