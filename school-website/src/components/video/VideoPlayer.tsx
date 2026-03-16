"use client";

import React from "react";
import dynamic from "next/dynamic";

// Use dynamic import with ssr: false for ReactPlayer as it requires browser APIs
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
  width: number;
  height: number;
}

const VideoPlayer = ({ url, width, height }: VideoPlayerProps) => (
  <div style={{ width, height }}>
    <ReactPlayer url={url} width="100%" height="100%" />
  </div>
);

export default VideoPlayer;
