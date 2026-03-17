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
      mimeType?: string;
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    }[];
  };
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = source?.homeVideoBanner || [];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (banners.length === 0) {
    return (
      <div className="w-full h-72 lg:h-96 bg-[#3B2565] flex items-center justify-center text-white">
        <p className="text-xl font-bold">Welcome to Beersheba School</p>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => {
          // Use mimeType (from Hygraph) first, then fall back to URL extension check
          const isVideo =
            banner.mimeType?.startsWith("video/") ||
            banner.url?.endsWith(".mp4") ||
            banner.url?.endsWith(".webm") ||
            banner.url?.endsWith(".ogg");

          return (
            <div key={index} className="relative min-w-full">
              {isVideo ? (
                <video
                  src={banner.url}
                  width={800}
                  height={700}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-72 lg:h-96 object-cover"
                />
              ) : (
                <img
                  src={banner.url || "/assets/image/placeholder.jpg"}
                  alt={banner.title || "Banner"}
                  className="w-full h-72 lg:h-96 object-cover"
                />
              )}
              <div className="absolute inset-0 mb-16 overflow-hidden lg:mb-[4.4rem] bg-[#3B2565]/60 p-5 text-white flex justify-center items-center flex-col gap-3 lg:gap-5  h-72 lg:h-96">
                <div
                  className={`${poppins.className} text-2xl lg:text-3xl font-semibold tracking-tight leading-snug text-center`}
                >
                  <div className="capitalize flex flex-col">
                    {banner.title ? (
                      <span className="text-3xl py-3 md:text-5xl uppercase">
                        {banner.title}
                      </span>
                    ) : (
                      <>
                        <span>WELCOME TO</span>
                        <span className="text-3xl py-3 md:text-5xl">
                          BEERSHEBA SR. SEC. SCHOOL
                        </span>
                        <span className="text-xl">HALDWANI</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-center text-white text-sm lg:text-base max-w-2xl px-4">
                  <p>
                    {banner.description || (
                      index === 0 ? "Empowering students with knowledge and skills for a brighter future." :
                      index === 1 ? "Cultivating adaptability and resilience to thrive in a changing world." :
                      "Fostering holistic development to build well-rounded individuals."
                    )}
                  </p>
                </div>
                <div className="flex gap-4 lg:gap-10 items-center z-50">
                  <Link href={banner.buttonLink || "/registeration"}>
                    <Button size="sm" className="lg:h-10">
                      {banner.buttonText || "Join Our School"}
                    </Button>
                  </Link>
                  <Link href={"/about"}>
                    <Button size="sm" variant="outline" className="lg:h-10 text-white border-white bg-transparent hover:bg-white/20">
                      Learn About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {banners.length > 1 && (
        <Pagination currentIndex={currentIndex} goToSlide={goToSlide} />
      )}
    </div>
  );
};

export default Slider;
