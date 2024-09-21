'use client';
import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Play, X } from 'lucide-react';
import { DownloadButton } from '~/components/dashboard/DownloadButton';
import { toast } from 'sonner';

const ProjectCard = ({ project }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const fetchAudio = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://dubbingapp.blob.core.windows.net/dubbingapp/" + project.url);
      const blob = await response.blob();
      const audioObjectUrl = URL.createObjectURL(blob);
      setAudioUrl(audioObjectUrl);
    } catch (error) {
      console.error('Error fetching audio:', error);
      toast.error('Error fetching audio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white mx-auto p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out w-full max-w-4xl">
      <div className="flex justify-between items-center">
        {/* Project name and info */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-800">{project.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {project.translateTo} · {new Date(project.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Project Type */}
        <div className="flex-shrink-0 ml-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Project information */}
      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <div className="flex-1">
          <p>Original audio Duration: {getMinAndSecs(project.durationMinutes)}</p>
          <p>Voice: {project.voice}</p>
          <p>Language: {project.currentLanguage}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              View on YouTube
            </a>
          )}
        </div>
      </div>

      {/* Action buttons and audio player */}
      <div className="mt-6 flex items-center gap-4">
        {/* Fetch and Play Button */}
        <Button
          variant="outline"
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
          onClick={fetchAudio}
        >
          <Play className="w-4 h-4" />
          <span>{isLoading ? 'Loading...' : 'Play Audio'}</span>
        </Button>

        {/* Download button */}
      </div>

      {/* Popup for audio player */}
      {audioUrl && (
        <div className="audio-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          {/* Audio player container */}
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <audio
              controls
              controlsList="nodownload noplaybackrate"
              className="w-full bg-gray-100 rounded-md"
              src={audioUrl}
            >
              Your browser does not support the audio element.
            </audio>

            {/* Close button */}
            <Button
              className="absolute top-2 right-2 p-1 text-gray-600 hover:text-red-500"
              onClick={() => setAudioUrl(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Project details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-xs text-gray-500">{new Date(project.createdAt).toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                <div><strong>Source Language:</strong> {project.currentLanguage}</div>
                <div><strong>Target Language:</strong> {project.translateTo}</div>
                <div><strong>Duration:</strong> {getMinAndSecs(project.durationMinutes)} </div>
                <div><strong>Voice:</strong> {project.voice}</div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 flex justify-end">
              <DownloadButton url={audioUrl} project={project} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

const getMinAndSecs = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
