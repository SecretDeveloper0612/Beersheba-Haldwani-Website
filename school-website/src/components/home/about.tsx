import Image from "next/image";
import React from "react";
import Heading2 from "../heading2";
import { poppins } from "@/utils/font";
import { Button } from "../ui/button";
import Link from "next/link";

const About = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
        {/* Decorative Background Elements */}
        <div className="absolute -top-6 -left-6 border-2 border-dashed border-[#E74040]/30 rounded-[2rem] w-full h-full -z-10 hidden lg:block" />
        
        <div className="relative group max-w-[450px] lg:max-w-none">
          <Image
            src={"/assets/image/about (1).jpg"}
            alt="Beersheba School Campus"
            width={500}
            height={400}
            className="object-cover z-10 rounded-[2rem] shadow-xl group-hover:scale-[1.02] transition-transform duration-500 w-full h-auto"
          />
        </div>
      </div>

      <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
        <div className="space-y-3">
          <span className="inline-block px-4 py-1 bg-[#E74040]/10 text-[#E74040] text-[10px] lg:text-xs font-black uppercase tracking-widest rounded-full">
            Founded 1977
          </span>
          <Heading2 title="Beersheba School" className="text-3xl sm:text-4xl lg:text-5xl" />
        </div>

        <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-medium">
          Beersheba School, located in Haldwani, was established on <span className="text-[#3B2565] font-bold">July 4, 1977</span>, in the heart of the city. What started with an initial enrollment of only 60 children has blossomed into a beacon of excellence.
        </p>

        <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
          Founded by the late Shri. and Smt. N.N.D. Bhatt, the school&apos;s journey is a testament to unwavering dedication. The inspiring vision of our founders continues to empower generations today.
        </p>

        <div className="pt-2 flex justify-center lg:justify-start">
          <Link href={"/about"}>
            <Button size="lg" className="bg-[#3B2565] hover:bg-[#2A1a4a] text-white px-8 h-12 rounded-xl transition-all shadow-lg text-sm lg:text-base flex items-center gap-2 group">
              Read More
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
