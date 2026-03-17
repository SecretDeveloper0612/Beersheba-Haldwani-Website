import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function GET() {
  try {
    const data: any = await HygraphService.getGalleryAlbums();
    return NextResponse.json({ data: data.galleryAlbums ?? [] });
  } catch (error) {
    console.error("Gallery Albums GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery albums" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, coverImageId } = body;

    const data: any = {
      title,
      description,
      ...(coverImageId ? { coverImage: { connect: { id: coverImageId } } } : {})
    };

    const album: any = await HygraphService.createGalleryAlbum(data);
    
    // Automatically publish the album
    await HygraphService.publishModel("GalleryAlbum", album.createGalleryAlbum.id);

    return NextResponse.json({ data: album.createGalleryAlbum });
  } catch (error) {
    console.error("Gallery Albums POST error:", error);
    return NextResponse.json({ error: "Failed to create gallery album" }, { status: 500 });
  }
}
