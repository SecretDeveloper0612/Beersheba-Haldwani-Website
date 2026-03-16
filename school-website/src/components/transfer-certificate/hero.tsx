import React from "react";
import Image from "next/image";

const TCHero = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/image/aboutImage.jpg"
          alt="School Campus"
          fill
          className="object-cover blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          Transfer Certificate Verification
        </h1>
        <p className="text-lg md:text-xl text-gray-200 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          Verify the authenticity of Transfer Certificates issued by Beersheba School Haldwani.
        </p>
      </div>
    </section>
  );
};

export default TCHero;
