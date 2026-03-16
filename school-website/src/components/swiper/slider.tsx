"use client";

import React, { useState } from "react";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { poppins } from "@/utils/font";
import Link from "next/link";

const Slider = ({
  source,
}: {
  source: {
    homeVideoBanner: {
      url: string;
    }[];
  };
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="relative min-w-full">
          <video
            src={source?.homeVideoBanner[0]?.url}
            width={800}
            height={700}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-72 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 mb-16 overflow-hidden lg:mb-[4.4rem] bg-[#3B2565]/60 p-5 text-white flex justify-center items-center flex-col gap-3 lg:gap-5  h-72 lg:h-96">
            <div
              className={`${poppins.className} text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-center`}
            >
              <p className="capitalize flex flex-col">
                <span>WELCOME TO</span>
                <span className="text-3xl py-3 md:text-5xl">
                  BEERSHEBA SR. SEC. SCHOOL
                </span>
                <span className="text-xl">HALDWANI</span>
              </p>
            </div>
            <div className="text-center text-white text-sm lg:text-base">
              <p>
                Empowering students with knowledge and skills for a brighter
                future.
              </p>
            </div>
            <div className="flex gap-10 items-center z-50">
              <Link href={"/registeration"}>
                <Button>Join Our School </Button>
              </Link>
              <Link href={"/about"}>
                <Button> Learn About Us</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-w-full">
          <video
            src={source?.homeVideoBanner[1]?.url}
            width={800}
            height={700}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-72 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 mb-16 overflow-hidden lg:mb-[4.4rem] bg-[#3B2565]/60 p-5 text-white flex justify-center items-center flex-col gap-3 lg:gap-5  h-72 lg:h-96">
            <div
              className={`${poppins.className} text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-center`}
            >
              <p className="capitalize">
                WELCOME TO{" "}
                <span className=" text-3xl md:text-5xl">
                  BEERSHEBA SR. SEC. SCHOOL{" "}
                </span>{" "}
                <span className="text-xl">HALDWANI</span>{" "}
              </p>
            </div>
            <div className="text-center text-white text-sm lg:text-base">
              <p>
                Cultivating adaptability and resilience to thrive in a changing
                world.
              </p>
            </div>
            <div className="flex gap-10 items-center z-50">
              <Link href={"/registeration"}>
                <Button>Join Our School </Button>
              </Link>
              <Link href={"/about"}>
                <Button> Learn About Us</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-w-full">
          <video
            src={source?.homeVideoBanner[2]?.url}
            width={800}
            height={700}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-72 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 mb-16 overflow-hidden lg:mb-[4.4rem] bg-[#3B2565]/60 p-5 text-white flex justify-center items-center flex-col gap-3 lg:gap-5  h-72 lg:h-96">
            <div
              className={`${poppins.className} text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-center`}
            >
              <p className="capitalize">
                WELCOME TO{" "}
                <span className=" text-3xl md:text-5xl">
                  BEERSHEBA SR. SEC. SCHOOL{" "}
                </span>{" "}
                <span className="text-xl">HALDWANI</span>{" "}
              </p>
            </div>
            <div className="text-center text-white text-sm lg:text-base">
              <p className="capitalize">
                Fostering holistic development to build well-rounded
                individuals.
              </p>
            </div>
            <div className="flex gap-10 items-center z-50">
              <Link href={"/registeration"}>
                <Button>Join Our School </Button>
              </Link>
              <Link href={"/about"}>
                <Button> Learn About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Pagination currentIndex={currentIndex} goToSlide={goToSlide} />
    </div>
  );
};

export default Slider;
