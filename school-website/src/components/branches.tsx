import React from "react";
import Heading3 from "./heading3";
import Image from "next/image";
import { poppins } from "@/utils/font";
import Link from "next/link";

const Branches = () => {
  return (
    <section className="bg-[#DED4F2]/50">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <Heading3 title="Our Branches" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-10">
          {[
            { name: "Beersheba Sr. Sec. School", loc: "Haldwani", href: "https://www.beershebaschool.in/", img: "/assets/image/haldwani (1).png" },
            { name: "Beersheba Sr. Sec. School", loc: "Almora", href: "https://www.beershebaalmora.in/", img: "/assets/image/haldwani (1).png" },
            { name: "NNDM Beershiva School", loc: "Ranikhet", href: "https://www.beershiva.in/", img: "/assets/image/BEERSHIBA SCHOOL (2).jpg" },
            { name: "Beershiva School", loc: "Chaukhutia", href: "https://www.beershivachaukhutia.in/", img: "/assets/image/BEERSHIBA SCHOOL (2).jpg" },
          ].map((branch, i) => (
            <Link key={i} href={branch.href} target="_blank">
              <div className="rounded-[2.5rem] bg-white flex flex-col p-8 lg:p-10 justify-center items-center h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-white hover:scale-[1.02] group">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gray-50 p-4 mb-6 group-hover:bg-purple-50 transition-colors">
                  <Image
                    src={branch.img}
                    alt={branch.loc}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h5 className={`${poppins.className} text-lg lg:text-xl text-[#3B2565] font-black text-center leading-tight`}>
                  {branch.name}
                </h5>
                <p className="text-[#E74040] font-bold uppercase tracking-widest text-[10px] lg:text-xs mt-2">{branch.loc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;
