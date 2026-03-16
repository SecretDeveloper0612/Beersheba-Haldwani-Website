"use client";
import React, { useEffect, useState } from "react";
import Heading3 from "../heading3";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { client_query_function } from "@/lib/graphql";
import { poppins } from "@/utils/font";
import { set } from "date-fns";

const ToppersResult = () => {
  const [topper, setTopper] = useState<TopperType>();
  const [otherTopper, setOtherTopper] = useState<TopperType>();
  const [classXTopperHeading, setClassXTopperHeading] = useState<string>("");
  const [classXTopperDesc, setClassXTopperDesc] = useState<string>("");
  const [classXiiTopperHeading, setClassXiiTopperHeading] =
    useState<string>("");
  const [classXiiTopperDesc, setClassXiiTopperDesc] = useState<string>("");

  const query = `
  query MyQuery {
    haldwaniHomes {
      toppers {
        class
        id
        topperDetails {
          id
          name
          percentage
          subject
          topperImage {
            url
          }
        }
      }
    classXTopperHeading
    classXTopperDesc
    classXiiTopperHeading
    classXiiTopperDesc
    }
  }
  `;

  useEffect(() => {
    async function toppers() {
      const response = (await client_query_function(query)) as HomeType;
      if (!response?.haldwaniHomes?.[0]) return;
      
      const homeData = response.haldwaniHomes[0];
      setTopper(homeData.toppers?.[0]);
      setOtherTopper(homeData.toppers?.[1]);
      setClassXTopperHeading(homeData.classXTopperHeading);
      setClassXTopperDesc(homeData.classXTopperDesc);
      setClassXiiTopperHeading(homeData.classXiiTopperHeading);
      setClassXiiTopperDesc(homeData.classXiiTopperDesc);
    }
    toppers();
  }, [query]);


  return (
    <section className="container mx-auto px-4 py-10 lg:py-16 bg-[#FDFCFE]">
      <div className="text-center mb-10">
        <Heading3 title="Our Outstanding Results" />
        <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-sm font-medium italic">
          &quot;Excellence is not a destination, it&apos;s a continuous journey.&quot;
        </p>
      </div>

      {/* Class X Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">
        <div className="relative max-w-[320px] sm:max-w-lg mx-auto lg:ml-0 order-2 lg:order-1">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3 pb-4">
              {topper?.topperDetails?.map((t) => (
                <CarouselItem className="pl-3 basis-full sm:basis-1/2" key={t?.id}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#3B2565] to-[#4c3282]">
                      <span className="text-[9px] text-white font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full">
                         {t?.subject}
                      </span>
                      <span className="text-white font-black text-lg">
                         {t?.percentage}%
                      </span>
                    </div>

                    <div className="relative aspect-[4/4.5] overflow-hidden">
                      <Image
                        src={t?.topperImage?.url}
                        alt={t?.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3B2565]/90 to-transparent" />
                      
                      <div className="absolute bottom-4 inset-x-0 px-3 text-center">
                        <p className="text-white font-bold text-base tracking-wide line-clamp-1">
                          {t?.name}
                        </p>
                        <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mt-0.5">Grade {(topper?.class)}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="space-y-4 text-center lg:text-left order-1 lg:order-2">
          <div className="space-y-1">
            <span className="inline-block px-3 py-0.5 bg-[#E74040]/10 text-[#E74040] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
              Class X ACHIEVEMENTS
            </span>
            <h3 className={`${poppins.className} font-black text-[#3B2565] text-3xl lg:text-4xl leading-tight`}>
              {classXTopperHeading}
            </h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            {classXTopperDesc}
          </p>
          <div className="pt-2 grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
             <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[#3B2565] font-black text-2xl lg:text-3xl">100%</p>
                <p className="text-gray-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">Pass Rate</p>
             </div>
             <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[#E74040] font-black text-2xl lg:text-3xl">50+</p>
                <p className="text-gray-500 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">Distinctions</p>
             </div>
          </div>
        </div>
      </div>

      {/* Class XII Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-4 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-1">
            <span className="inline-block px-3 py-0.5 bg-[#E74040]/10 text-[#E74040] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full">
              Class XII ACHIEVEMENTS
            </span>
            <h3 className={`${poppins.className} font-black text-[#3B2565] text-3xl lg:text-4xl leading-tight`}>
              {classXiiTopperHeading}
            </h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            {classXiiTopperDesc}
          </p>
          <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
             <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#3B2565]/5 flex items-center justify-center shrink-0">
                <Image src="/assets/image/success-svgrepo-com (1) 1.png" alt="success" width={20} height={20} className="lg:w-6 lg:h-6" />
             </div>
             <p className="text-[#3B2565] font-bold text-xs lg:text-sm">Setting new benchmarks in excellence every year.</p>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 max-w-[320px] sm:max-w-lg mx-auto lg:mr-0">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3">
              {otherTopper?.topperDetails?.map((oT) => (
                <CarouselItem key={oT?.id} className="pl-3 basis-full sm:basis-1/2">
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#E74040] to-[#c23535]">
                      <span className="text-[9px] text-white font-black uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full">
                         {oT?.subject}
                      </span>
                      <span className="text-white font-black text-lg">
                         {oT?.percentage}%
                      </span>
                    </div>

                    <div className="relative aspect-[4/4.5] overflow-hidden">
                      <Image
                        src={oT?.topperImage?.url}
                        alt={oT?.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#E74040]/90 to-transparent" />
                      
                      <div className="absolute bottom-4 inset-x-0 px-3 text-center">
                        <p className="text-white font-bold text-base tracking-wide line-clamp-1">
                          {oT?.name}
                        </p>
                        <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest mt-0.5">Grade {otherTopper?.class}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 lg:hidden">
               {/* Dot indicators or similar could go here if needed, but carousel handles it */}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ToppersResult;
