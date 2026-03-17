import Image from "next/image";
import React from "react";
import Heading2 from "../heading2";
import { poppins } from "@/utils/font";
import { Button } from "../ui/button";
import Link from "next/link";

const NewSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="relative flex justify-center items-center order-2 lg:order-1">
        <div className="relative group max-w-[320px] sm:max-w-md">
          <Image
            src={"/assets/image/uday-samman.jpg"}
            alt="About Image"
            width={400}
            height={400}
            className="object-cover z-10 rounded-[2rem] shadow-xl w-full h-auto"
          />
          {/* Decorative Border */}
          <div className="absolute -top-4 -left-4 border-2 border-dashed border-[#DB2F2F]/30 rounded-[2.5rem] w-full h-full -z-10 bg-[#DB2F2F]/5"></div>
        </div>
      </div>

      <div className="text-center lg:text-left order-1 lg:order-2 space-y-4">
        <div className="space-y-1">
          <Link href="/assets/image/uday-samman.jpg" target="_blank">
            <p className={`${poppins.className} text-xl lg:text-2xl font-black text-[#DB2F2F] uppercase tracking-tight hover:underline`}>
              👉UDAY SAMMAN (Click to View)
            </p>
          </Link>
          <Heading2 title="Recognizing Excellence & Leadership" className="text-3xl lg:text-4xl" />
        </div>

        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
          We are immensely proud to announce that our school has been honored with the prestigious 
          UDAY SAMMAN. This recognition celebrates our commitment to providing exceptional 
          education and fostering a nurturing environment for all our students. 
          It is a testament to the hard work and dedication of our staff, students, and 
          supportive community in striving for excellence in every endeavor.
        </p>
      </div>
    </section>
  );
};

export default NewSection;
