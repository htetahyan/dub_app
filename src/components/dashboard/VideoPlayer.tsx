'use client';

import React, { useState } from 'react';
import { Button } from "~/components/ui/button";
import { Play } from "lucide-react";
import {DownloadButton} from "~/components/dashboard/DownloadButton";
import {CgClose} from "react-icons/cg";

// VideoPlayer component that fetches video and plays it in a popup
const VideoPlayer = ({ project }: any) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchVideo = async () => {
        try {
            setIsLoading(true);
            // Fetch video from API using project.dubbing.id
            const response = await fetch(`/api/project?dubbingId=${project.dubbingId}`);
            const blob = await response.blob(); // Convert response to blob

            // Create object URL from the blob
            const videoObjectUrl = URL.createObjectURL(blob);

            // Set video URL to play in the video player
            setVideoUrl(videoObjectUrl);
        } catch (error) {
            console.error('Error fetching video:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 w-full h-full ">
            {videoUrl && (
                <div className="video-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
                    {/* Video player */}
                    <div className="relative bg-white p-4 rounded-lg">
                        <video controls className="w-full h-auto max-w-lg rounded-lg shadow-lg">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Button
                            className="absolute -top-4 -right-4  text-gray-600 hover:text-gray-900"
                            onClick={() => setVideoUrl(null)}
                        >
                            <CgClose className="w-6 h-6 text-red-400" />
                        </Button>
                    </div>
                </div>
            ) }
                <div className="  justify-center space-y-4">
                    <h2 className="text-2xl font-bold">{project.name}</h2>
                    <div className="text-sm text-gray-600">
                        <p>Language: {project.currentLanguage}</p>
                        <p>date: {new Date(project.createdAt).toLocaleString()}</p>

                    </div>
                    {isLoading ? (
                        <div className="text-blue-500">Loading video...</div>
                    ) : (
                        <Button variant="outline" className="flex  items-center w-fit" onClick={fetchVideo}>
                            <Play className="" />

                        </Button>

                    )}
                </div>

        </div>
    );
};

export default VideoPlayer;
