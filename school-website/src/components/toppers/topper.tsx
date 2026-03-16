import { poppins } from "@/utils/font";
import Image from "next/image";
import React from "react";
import Heading3 from "../heading3";

const Topper = () => {
  return (
    <section className="container p-10 ">
      <Heading3 title="Class 12th Toppers" />

      <div className="flex gap-32 flex-wrap justify-evenly p-10 my-10">
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>

        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
        <div className="bg-[#3B2565] rounded p-1 relative">
          <Image
            src={"/assets/image/topper1.png"}
            alt="toppers"
            width={100}
            height={100}
            className="w-40 h-48 object-cover"
          />

          <div className={`${poppins.className} py-1 text-white text-center`}>
            <p className="font-semibold">Abhas Joshi</p>
            <p className="text-sm">(2019-20)</p>
          </div>

          <div className="bg-[#F8EF2E] rounded-b-xl text-[#3B2565] absolute top-1 right-1 p-1">
            <p className="font-bold text-sm">78%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topper;
