import React from "react";

type Props = {
  source: string;
};

const Video = ({ source }: Props) => {
  return (
    <section className="h-52 lg:h-80 w-full">
      <video
        className="h-full w-full object-cover"
        width={1300}
        height={500}
        muted
        loop
        autoPlay
        poster="/assets/image/thumbnail.jpg"
      >
        <source src={source} type="video/mp4" />
      </video>
    </section>
  );
};

export default Video;
