import Image from "next/image";
import React from "react";
import Heading2 from "../heading2";
import { poppins } from "@/utils/font";

const NewSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="relative flex justify-center items-center order-2 lg:order-1">
        <div className="relative group max-w-[320px] sm:max-w-md">
          <Image
            src={"https://ap-south-1.graphassets.com/clwigbb9v06kb07pf9nw378cz/cm5t8ibgl1k0g07phyhos269s"}
            alt="Our Inclusive Learning Community"
            width={500}
            height={400}
            className="object-cover z-10 rounded-[2rem] shadow-xl w-full h-auto"
          />
          {/* Decorative Border */}
          <div className="absolute -top-4 -left-4 border-2 border-dashed border-[#3B2565]/30 rounded-[2.5rem] w-full h-full -z-10 bg-[#3B2565]/5"></div>
        </div>
      </div>

      <div className="text-center lg:text-left order-1 lg:order-2 space-y-4">
        <div className="space-y-1">
          <p className={`${poppins.className} text-xl lg:text-2xl font-black text-[#DB2F2F] uppercase tracking-tight`}>
            Embracing Every Voice
          </p>
          <Heading2 title="Our Inclusive Learning Community" className="text-3xl lg:text-4xl" />
        </div>

        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
          At Beersheba, we believe in the power of every child&apos;s potential. Our specialized
          program for deaf and hard-of-hearing students creates a vibrant, barrier-free
          environment where communication flourishes in all forms. Through innovative
          teaching methods and cutting-edge technology, we nurture these bright minds,
          helping them express themselves confidently and achieve their dreams. Here, every
          gesture speaks volumes, and every milestone is celebrated with joy. Join our
          inclusive community where diversity is our strength, and every child&apos;s unique voice
          is heard and valued.
        </p>
      </div>
    </section>
  );
};

export default NewSection;
