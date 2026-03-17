import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

// PUT /api/gallery/albums/[id] - Update an album
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const params = await props.params;
    const { id } = params;
    const { heading, bannerId, imageIds } = body;

    const updateData: any = {
      heading,
    };

    if (bannerId) {
      updateData.banner = { connect: { id: bannerId } };
    }

    if (imageIds && Array.isArray(imageIds)) {
      updateData.images = { connect: imageIds.map((id: string) => ({ where: { id } })) };
    }

    await HygraphService.updateGalleryAlbum(id, updateData);
    await HygraphService.publishModel("ImageGallery", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery Album PUT error:", error);
    return NextResponse.json({ error: "Failed to update album in Hygraph" }, { status: 500 });
  }
}

// DELETE /api/gallery/albums/[id] - Delete an album and its images
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    await HygraphService.deleteGalleryAlbum(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery Album DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete album from Hygraph" }, { status: 500 });
  }
}
