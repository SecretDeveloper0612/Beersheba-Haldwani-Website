import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

// PUT /api/video-gallery/[id] - Update a video
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const params = await props.params;
    const { id } = params;
    const { videoTitle, videoUrl, videoImageId } = body;

    const updateData: any = {
      videoTitle,
      videoUrl,
    };

    if (videoImageId) {
      updateData.videoImage = { connect: { id: videoImageId } };
    }

    await HygraphService.updateVideoGallery(id, updateData);
    await HygraphService.publishModel("HaldwaniVideoGallery", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Video Gallery PUT error:", error);
    return NextResponse.json({ error: "Failed to update video in Hygraph" }, { status: 500 });
  }
}

// DELETE /api/video-gallery/[id] - Delete a video
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    await HygraphService.deleteVideoGallery(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Video Gallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete video from Hygraph" }, { status: 500 });
  }
}
