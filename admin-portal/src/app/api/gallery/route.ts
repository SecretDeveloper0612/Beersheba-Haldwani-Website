import { NextResponse } from "next/server";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

import { HygraphService } from "@/lib/hygraph-service";

export async function GET() {
  try {
    const data: any = await HygraphService.getGalleryAlbums();
    const homeData: any = await HygraphService.getHaldwaniHome();
    
    // Transform imageGalleries to match UI expectations
    const albums = (data.imageGalleries || []).map((a: any) => ({
      id: a.id,
      name: a.heading,
      description: "",
      cover_image: a.banner?.url
    }));

    // Add "Home Gallery" as a virtual album if it has images
    if (homeData?.homeGallery?.length > 0) {
      albums.push({
        id: "home-gallery",
        name: "Home Gallery",
        description: "Featured images from the homepage",
        cover_image: homeData.homeGallery[0]?.homeGalleryImage?.[0]?.url
      });
    }

    // Flatten images from all albums
    const images: any[] = (data.imageGalleries || []).flatMap((album: any) => 
      (album.images || []).map((img: any) => ({
        id: img.id,
        caption: album.heading,
        image_url: img.url,
        album_id: album.id,
        created_at: album.createdAt
      }))
    );

    // Add Home Gallery images
    if (homeData?.homeGallery) {
      homeData.homeGallery.forEach((item: any) => {
        if (item.homeGalleryImage) {
          item.homeGalleryImage.forEach((img: any, idx: number) => {
            images.push({
              id: `${item.id}-${idx}`,
              caption: "Home Featured",
              image_url: img.url,
              album_id: "home-gallery",
              created_at: homeData.createdAt
            });
          });
        }
      });
    }

    return NextResponse.json({ albums, images });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery data" }, { status: 500 });
  }
}
