'use client';

import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import React from 'react';
import { toast } from 'sonner';

export const DownloadButton = ({ url, project }: { url: string, project: any }) => {
  const downloadMp3 = async () => {
    toast.loading('Downloading...');
    const res = await fetch(url, {
      method: 'GET',
      headers: {},
    });
    const blob = await res.blob();
    const newBlob = new Blob([blob], {
      type: 'audio/mpeg',
    });
    const durl = URL.createObjectURL(newBlob);
    const a = document.createElement('a');
    a.href = durl;
    a.download = `${project.name}.mp3`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(durl);
      toast.dismiss()
    }, 100);
  };

  return (
    <div className="relative flex gap-2 items-center">
      <a href={url} download={`${project.name}.wav`}>
        <Button className="px-2 py-1 flex items-center gap-1 text-sm">
          <Download className="w-4 h-4" /> Wav
        </Button>
      </a>

      <Button onClick={downloadMp3} className="px-2 py-1 flex items-center gap-1 text-sm">
        <Download className="w-4 h-4" /> Mp3
      </Button>
    </div>
  );
};
