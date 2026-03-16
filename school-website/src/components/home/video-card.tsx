import { poppins } from "@/utils/font";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type VideoCardProps = {
  source: string;
  title: string;
  desc: string;
  link: string;
};

const VideoCard = ({ source, title, desc, link }: VideoCardProps) => {
  return (
    <Link href={`${link}`} className="block group h-full">
      <div className="h-full bg-white rounded-2xl p-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(59,37,101,0.15)] flex flex-col items-center text-center gap-3 transition-all duration-300 group-hover:-translate-y-2 border border-white hover:border-[#3B2565]/10">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#3B2565]/5 transition-colors duration-300">
           <Image src={source} width={48} height={48} alt={title} className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
        </div>
        <h5
          className={`${poppins.className} text-lg lg:text-xl font-bold text-[#3B2565] relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-1 after:bg-[#E74040] after:rounded-full`}
        >
          {title}
        </h5>
        <p className="text-gray-400 text-xs lg:text-sm font-medium leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
};

export default VideoCard;
