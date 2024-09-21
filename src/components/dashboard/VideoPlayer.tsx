'use client';

import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Play } from 'lucide-react';
import { DownloadButton } from '~/components/dashboard/DownloadButton';
import { CgClose } from 'react-icons/cg';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

const VideoPlayer = ({ project }: any) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchVideo = async () => {
    try {
        setIsLoading(true);
        const response = await fetch(`/api/project?dubbingId=${project.dubbingId}&&targetLanguage=${project.translateTo}`);
        const errorText = await response.json(); // Get the response text for better debugging

        // Check if response is not ok and handle errors
        if (!response.ok) {
            console.error('Error fetching video:', response.status, errorText); // Log the error
            throw new Error(` ${errorText.message}`);
        }

        const blob = await response.blob();
        const videoObjectUrl = URL.createObjectURL(blob);
        setVideoUrl(videoObjectUrl);
    } catch (error: any) {
        console.error('Error fetching video:', error);
        // Show the error toast with more detailed error message
        toast.error(`${error.message}`);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="p-4 w-full h-full">
      {/* Popup for video player */}
      {videoUrl && (
        <div className="video-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          {/* Video player container */}
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
            <video controls className="w-full h-auto rounded-lg">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Close button */}
            <Button
              className="absolute top-2 right-2 p-1 text-gray-600 hover:text-red-500"
              onClick={() => setVideoUrl(null)}
            >
              <CgClose className="w-6 h-6" />
            </Button>

            {/* Project details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                <div><strong>Source Language:</strong> {project.currentLanguage}</div>
                <div><strong>Target Language:</strong> {project.translateTo}</div>
                <div><strong>Credits Used:</strong> {project.creditsUsed}</div>
                <div><strong>Dubbed Range:</strong> {project.dubbedRange}</div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-4 flex justify-end">
              <DownloadButton url={videoUrl} project={project} />
            </div>
          </div>
        </div>
      )}

      {/* Project Information and Play Video button */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <p>Language: {project.currentLanguage}</p>
            
            <Badge>{project?.projectType}</Badge>
          </div>
          <div><strong>Target Language:</strong> {project.translateTo}</div>

          <p>Date: {new Date(project.createdAt).toLocaleString()}</p>
        </div>

        {/* Fetch video button */}
        <Button
          variant="outline"
          disabled={isLoading}
          className="flex items-center space-x-2 w-fit"
          onClick={fetchVideo}
        >
          <Play className="w-4 h-4" />
          <span>{isLoading ? 'Loading...' : 'Play Video'}</span>
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayer;
