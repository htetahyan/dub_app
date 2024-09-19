'use client';

import React, { useState } from 'react';
import { Button } from "~/components/ui/button";
import { Play } from "lucide-react";
import { DownloadButton } from "~/components/dashboard/DownloadButton";
import { CgClose } from "react-icons/cg";

const VideoPlayer = ({ project }: any) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchVideo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/project?dubbingId=${project.dubbingId}`);
            const blob = await response.blob();

            const videoObjectUrl = URL.createObjectURL(blob);
            setVideoUrl(videoObjectUrl);
        } catch (error) {
            console.error('Error fetching video:', error);
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
                    <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                        <video controls className="w-full h-auto rounded-lg">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Close button */}
                        <Button
                            className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900"
                            onClick={() => setVideoUrl(null)}
                        >
                            <CgClose className="w-6 h-6 text-red-400" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Project information */}
            <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <div className="text-sm text-gray-600">
                    <p>Language: {project.currentLanguage}</p>
                    <p>Date: {new Date(project.createdAt).toLocaleString()}</p>
                </div>

                {/* Fetch video button */}
                {isLoading ? (
                    <div className="text-blue-500">Loading video...</div>
                ) : (
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2 w-fit"
                        onClick={fetchVideo}
                    >
                        <Play className="w-4 h-4" />
                        <span>Play Video</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
