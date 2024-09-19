import { Play } from "lucide-react";
import { DownloadButton } from "./DownloadButton";

const ProjectCard = ({ project }: any) => {
  const audioUrl = `${process.env.AZURE_BLOB_URL}/${project.url}`;

  return (
    <div className="border border-gray-300 mt-2 p-4 rounded-lg shadow-md bg-white w-full max-w-sm mx-auto">
      {/* Audio controls */}
      <div className="flex items-center gap-2">
        <audio
          controls
          className="w-full h-8 bg-gray-200 rounded-lg"
          src={audioUrl}
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Project details */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
        <p className="text-sm text-gray-500">
          {project.translateTo} - {new Date(project.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Download buttons */}
      <div className="mt-4 flex justify-between gap-2">
      
        <DownloadButton
          url={audioUrl}
          project={project}
        
        />
      </div>
    </div>
  );
};

export default ProjectCard;
