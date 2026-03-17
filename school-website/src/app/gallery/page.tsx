import Banner from "@/components/banner";
import Heading3 from "@/components/heading3";
import { server_query_function } from "@/lib/graphql";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  const query = `query MyQuery {
  imageGalleries {
    id
    heading
    banner {
      url
    }
    images {
      url
    }
  }
}`;

  try {
    const response = (await server_query_function(query)) as any;
    const album = response?.imageGalleries?.[0]; // Show the first album for now, or you might want to map all albums.
    const images = album?.images;


    if (!images || images.length === 0) {
      return (
        <>
          <Banner
            title="Gallery"
            description="Beersheba - Haldwani"
            source="/assets/image/aboutImage.jpg"
          />
          <div className="p-20 text-center font-bold text-gray-500">
            No gallery images found.
          </div>
        </>
      );
    }

    return (
      <>
        <Banner
          title="Gallery"
          description="Beersheba - Haldwani"
          source="/assets/image/aboutImage.jpg"
        />
        <section className="container p-5 lg:p-10 ">
          <Heading3 title="Gallery" />

          <div className="my-5 md:my-10">
            <h2 className="text-3xl text-balance md:text-4xl font-semibold text-center uppercase tracking-wider">
              {album?.heading}
            </h2>

            <div className="flex flex-wrap items-center gap-5 justify-center md:justify-evenly py-5 md:py-10">
              {images?.map((img: any, i: number) => (
                <Image
                  key={i}
                  src={img.url}
                  alt="gallery"
                  width={300}
                  height={450}
                  className="w-80 h-96 object-cover rounded-2xl shadow-lg border border-gray-100"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </section>

      </>
    );
  } catch (error) {
    console.error("Error fetching gallery from Hygraph:", error);
    return (
      <>
        <Banner
          title="Gallery"
          description="Beersheba - Haldwani"
          source="/assets/image/aboutImage.jpg"
        />
        <div className="p-20 text-center text-red-500 font-bold">
          Error loading gallery.
        </div>
      </>
    );
  }
};

export default page;
