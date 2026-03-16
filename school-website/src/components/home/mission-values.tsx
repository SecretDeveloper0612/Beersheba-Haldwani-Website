import React from "react";
import Heading3 from "../heading3";
import Image from "next/image";
import { poppins } from "@/utils/font";
import { CircleCheckBig } from "lucide-react";

const MissionAndValues = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-12 lg:mb-16">
        <Heading3 title="Vision & Our Values" />
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm lg:text-base font-medium">
          Nurturing the leaders of tomorrow through a balanced approach to academic excellence and moral character.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Our Core Values Card */}
        <div className="md:col-span-2 p-6 lg:p-8 rounded-3xl bg-[#D6C9EF]/60 shadow-lg flex flex-col justify-between border border-white group hover:bg-[#D6C9EF]/80 transition-all duration-300">
          <div className="space-y-4 lg:space-y-6">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-white rounded-2xl shadow-sm shrink-0">
                <Image
                  src={"/assets/image/accountability (2) 1.png"}
                  alt="Core Values Icon"
                  width={32}
                  height={32}
                  className="lg:w-10 lg:h-10"
                />
              </div>
              <h4 className={`${poppins.className} text-[#3B2565] text-xl lg:text-2xl font-black`}>
                Our Core Values
              </h4>
            </div>
            <p className="text-[#3B2565] text-base lg:text-lg leading-relaxed font-medium">
              At Beersheba School, we are committed to fostering a nurturing and inclusive environment where every student can thrive.
            </p>
          </div>
          <div className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            <div className="flex gap-3 items-center p-3 bg-white/40 rounded-xl">
              <CircleCheckBig size={18} className="text-[#E74040]" />
              <p className="text-[#3B2565] text-sm font-bold">Honesty & Respect</p>
            </div>
            <div className="flex gap-3 items-center p-3 bg-white/40 rounded-xl">
              <CircleCheckBig size={18} className="text-[#E74040]" />
              <p className="text-[#3B2565] text-sm font-bold">Excellence</p>
            </div>
          </div>
        </div>

        {/* Vision Image */}
        <div className="relative group overflow-hidden rounded-3xl h-64 lg:h-full">
          <Image
            src={"/assets/image/vision (1).jpg"}
            alt="School Vision"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B2565]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-white font-black text-lg lg:text-xl tracking-wide uppercase">Our Vision</p>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="p-6 lg:p-8 rounded-3xl bg-white shadow-lg border border-gray-100 flex flex-col gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#3B2565]/5 rounded-xl flex items-center justify-center">
             <Image src={"/assets/image/ep_view.png"} alt="Vision Icon" width={24} height={24} className="lg:w-[30px] lg:h-[30px]" />
          </div>
          <h4 className={`${poppins.className} text-[#3B2565] text-lg lg:text-xl font-black`}>Forward Thinking</h4>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            To unlock each student&apos;s potential through innovative practices, fostering adaptability and critical thinking.
          </p>
        </div>

        {/* Mission Image */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-3xl h-64 lg:h-[300px]">
          <Image
            src={"/assets/image/mission (1).jpg"}
            alt="School Mission"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B2565]/60 to-transparent" />
          <div className="absolute top-1/2 left-6 lg:left-8 -translate-y-1/2 max-w-[200px] lg:max-w-xs">
            <h4 className="text-white text-2xl lg:text-3xl font-black mb-2">Our Mission</h4>
            <p className="text-white/90 text-xs lg:text-sm font-medium">Creating a supportive environment for curiosity and social development.</p>
          </div>
        </div>

        {/* Our Mission Card */}
        <div className="md:col-span-2 p-6 lg:p-8 rounded-3xl bg-[#3B2565] shadow-2xl flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
          <div className="shrink-0 p-3 lg:p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
             <Image src={"/assets/image/Vector-icon.png"} alt="Mission Icon" width={40} height={40} className="invert brightness-0 lg:w-[60px] lg:h-[60px]" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <p className="text-white/90 text-base lg:text-lg leading-relaxed font-medium">
              Equipping students with the skills and values needed to succeed in a rapidly evolving world through holistic development.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 lg:gap-4">
               <span className="px-3 lg:px-4 py-1 lg:py-2 bg-white/10 rounded-full text-white text-[10px] lg:text-sm font-bold border border-white/20">Holistic Growth</span>
               <span className="px-3 lg:px-4 py-1 lg:py-2 bg-white/10 rounded-full text-white text-[10px] lg:text-sm font-bold border border-white/20">Innovation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndValues;
