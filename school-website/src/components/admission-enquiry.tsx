import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const AdmissionEnquiry = () => {
  return (
    <section className="relative h-64 lg:h-80 overflow-hidden group">
      <Image
        src={"/assets/image/enquiry.jpg"}
        alt="Admission Enquiry"
        width={1400}
        height={400}
        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-[#3B2565]/80 flex flex-col gap-6 lg:gap-8 justify-center items-center px-4 text-center">
        <p className="text-2xl lg:text-5xl font-black text-white max-w-3xl leading-tight">
          Your Kids Deserve the <span className="text-[#F8EF2E]">Best Education</span>
        </p>
        <Link href={"/registeration"}>
          <Button size="lg" className="bg-[#E74040] hover:bg-[#c23535] text-white px-8 lg:px-12 h-12 lg:h-14 rounded-full text-sm lg:text-lg font-black transition-all shadow-xl hover:shadow-[#E74040]/30 hover:-translate-y-1">
            Apply for Admission
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AdmissionEnquiry;
