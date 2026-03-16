"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListRestart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ImageGallery {
  heading: string;
  id: string;
  banner: {
    url: string;
  };
}

interface GalleryClientProps {
  initialImages: ImageGallery[];
}

const GalleryClient = ({ initialImages }: GalleryClientProps) => {
  const [filteredImages, setFilteredImages] =
    useState<ImageGallery[]>(initialImages);

  const resetFilter = () => {
    setFilteredImages(initialImages);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (!searchTerm) {
      resetFilter();
      return;
    }
    const searchResults = initialImages.filter((item) => {
      const heading = item.heading.toLowerCase();
      return (
        heading.includes(searchTerm) ||
        heading.startsWith(searchTerm) ||
        heading.split(" ").some((word) => word === searchTerm)
      );
    });
    setFilteredImages(searchResults);
  };

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search from here..."
          className="w-full p-2 border rounded-lg"
          onChange={handleSearch}
        />
        <Button onClick={resetFilter}>
          Reset Filter <ListRestart size={20} className="ml-2" />
        </Button>
      </div>
      <div className="container grid py-10 md:py-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {filteredImages.reverse().map((item) => (
          <Link href={`/image-gallery/${item?.id}`} key={item?.id}>
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={item?.banner.url}
                alt={item?.heading}
                width={500}
                height={500}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item?.heading}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default GalleryClient;
