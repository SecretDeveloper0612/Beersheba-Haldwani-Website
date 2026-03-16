import { poppins } from "@/utils/font";
import React from "react";

type Props = {
  title: string;
};

const Heading3 = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`relative flex flex-col items-center gap-2 ${className || ""}`}>
      <h2
        className={`${poppins.className} font-black text-[#3B2565] text-3xl md:text-4xl tracking-tight text-center`}
      >
        {title}
      </h2>
      <div className="w-12 h-1.5 bg-[#E74040] rounded-full"></div>
    </div>
  );
};

export default Heading3;
