'use client';

import { cn } from '@/lib/utils';
import React, { useRef } from 'react';


const TemplateSelect = ({
  templates,
  onSelect,
  selected
}: {
  templates: { id: number; name: string, videoUrl:string, imageUrl:string }[];
  onSelect: (id: number) => void;
  selected: number | null;
}) => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {templates.map((video, index) => (
        <div key={index} className={cn("flex-none w-16 aspect-[3/5] rounded overflow-hidden shadow-md",selected== video.id && "outline-4 outline-fuchsia-500")} onClick={()=>onSelect(video.id)}>
          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            className="w-full h-full object-cover"
            src={video.videoUrl}
            poster={video.imageUrl}
            muted
            loop
            preload="metadata"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default TemplateSelect;