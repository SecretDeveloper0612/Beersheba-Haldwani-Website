"use client";

import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

interface VideoGridProps {
  videos: string[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  const [dimensions, setDimensions] = useState({ width: 400, height: 220 });

  useEffect(() => {
    // Set initial dimensions
    updateDimensions();

    // Add window resize event listener
    window.addEventListener("resize", updateDimensions);

    // Clean up event listener
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setDimensions({ width: 400, height: 220 });
    } else if (width >= 768) {
      setDimensions({ width: 400, height: 200 });
    } else {
      setDimensions({ width: 320, height: 180 });
    }
  };

  return (
    <section className="container py-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videos?.map((url, i) => (
        <VideoPlayer
          key={i}
          url={url}
          width={dimensions.width}
          height={dimensions.height}
        />
      ))}
    </section>
  );
};

export default VideoGrid;
