import Banner from "@/components/banner";
import Heading3 from "@/components/heading3";
import { query } from "@/lib/db";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  // Fetch albums and images from MySQL
  const albums = (await query(
    "SELECT * FROM gallery_albums WHERE is_active = true ORDER BY sort_order"
  )) as any[];

  const allImages = (await query(
    "SELECT * FROM gallery_images WHERE is_active = true ORDER BY sort_order"
  )) as any[];

  // Map MySQL data to the structure the component expects
  const images = albums?.map(album => ({
    imageCategoryName: album.name,
    image: allImages
      ?.filter(img => img.album_id === album.id)
      .map(img => ({ url: img.image_url })) || []
  })).filter(cat => cat.image.length > 0);

  if (!images || images.length === 0) {
    return (
      <>
        <Banner
          title="Gallery"
          description="Beersheba - Haldwani"
          source="/assets/image/aboutImage.jpg"
        />
        <div className="p-20 text-center font-bold text-gray-500">
          No gallery images found in the database. 
          <br />
          Add albums and photos via the Admin Panel to see them here.
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

        {images?.map((img, i) => {
          return (
            <div className="my-5 md:my-10" key={i}>
              <h2 className="text-3xl text-balance md:text-4xl font-semibold text-center">
                {img.imageCategoryName}
              </h2>

              <div className="flex flex-wrap items-center gap-5 justify-center md:justify-evenly py-5 md:py-10">
                {img.image?.map((uri, i) => (
                  <Image
                    key={i}
                    src={uri.url}
                    alt="gallery"
                    width={300}
                    height={450}
                    className="w-80 h-96 object-cover rounded-2xl shadow-lg border border-gray-100"
                    unoptimized
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default page;
