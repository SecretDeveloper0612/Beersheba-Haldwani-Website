import Image from "next/image";
import React from "react";
import Heading3 from "../heading3";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Gallery = ({
  image,
}: {
  image: {
    url: string;
  }[];
}) => {
  if (!image || image.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-10 lg:mb-16">
        <Heading3 title="Our Gallery" />
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm lg:text-base font-medium">
          A glimpse into the vibrant campus life and memorable moments at Beersheba School.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {image?.map((uri, index) => (
          <div key={index} className="relative group overflow-hidden rounded-[2rem] shadow-lg aspect-[4/3] lg:aspect-square">
            <Image
              src={uri.url}
              alt="Gallery Image"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
