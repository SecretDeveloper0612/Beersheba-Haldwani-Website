import { poppins } from "@/utils/font";
import Image from "next/image";
import React from "react";
import Heading from "./heading";
import ShortDesc from "./shortDesc";

type props = {
  source: string;
  title: string;
  description: string;
};

const Banner = ({ source, title, description }: props) => {
  return (
    <section className=" relative h-52 md:h-72 bg-primary text-white">
      <Image
        src={source}
        width={1200}
        height={600}
        alt="banner"
        className="w-full object-cover h-52 md:h-72"
      />

      <div className="absolute w-full h-full bg-gradient-to-r from-[#3B2565] to-[#774ACB]/30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex justify-center lg:justify-evenly items-center">
        <div>
          <Heading title={title} />
          <ShortDesc description={description} />
        </div>
        <div className="hidden lg:block"></div>
        <div className="hidden lg:block"></div>
        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
};

export default Banner;
