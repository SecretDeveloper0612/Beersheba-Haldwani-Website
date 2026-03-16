import Link from "next/link";
import React from "react";
import { getSiteSettings } from "@/lib/db";

const Marque = async () => {
  const settings = await getSiteSettings();
  const text = settings?.marquee_text || "Online Registration Open for 2024-25";

  return (
    <div className=" bg-[#3B2565] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white px-2 py-2 text-xs md:text-sm font-bold uppercase tracking-widest overflow-hidden">
      <Link href={"/registeration"} className="col-span-full">
        <p className="animate-marquee text-center whitespace-nowrap">
          {text} • {text} • {text} • {text} • {text}
        </p>
      </Link>
    </div>
  );
};

export default Marque;
