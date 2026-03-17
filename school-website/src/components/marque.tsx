import Link from "next/link";
import React from "react";

const Marque = () => {
  const text = "Online Registration Open for 2024-25";

  return (
    <div className="bg-[#3B2565] text-white py-2 text-xs md:text-sm font-bold uppercase tracking-widest overflow-hidden whitespace-nowrap">
      <Link href={"/registeration"}>
        <div className="animate-marquee flex w-max gap-10">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          {/* Duplicate for seamless effect with translateX(-50%) */}
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </Link>
    </div>
  );
};

export default Marque;
