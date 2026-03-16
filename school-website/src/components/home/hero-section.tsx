import React from "react";
import Slider from "../swiper/slider";

const HeroSection = ({
  video,
}: {
  video: {
    homeVideoBanner: {
      url: string;
    }[];
  }[];
}) => {
  if (!video?.[0]) {
    return null; // Or a fallback banner
  }
  return (
    <section>
      <Slider source={video[0]} />
    </section>
  );
};

export default HeroSection;
