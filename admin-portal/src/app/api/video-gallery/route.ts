import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

// GET /api/video-gallery
export async function GET() {
  try {
    const data: any = await HygraphService.getVideoGalleries();
    
    // Transform to match UI expectations: video_url (snake_case)
    // Also, haldwaniVideo.url is often an array in this specific Hygraph schema
    const mapped: any[] = [];
    
    (data.haldwaniVideoGalleries ?? []).forEach((item: any) => {
      const urls = Array.isArray(item.haldwaniVideo?.url) 
        ? item.haldwaniVideo.url 
        : item.haldwaniVideo?.url 
          ? [item.haldwaniVideo.url] 
          : [];

      urls.forEach((url: string, index: number) => {
        mapped.push({
          id: `${item.id}-${index}`, // Unique ID for each video in the list
          title: item.title || `Video ${index + 1}`,
          video_url: url,
          source: url.includes("youtube") || url.includes("youtu.be") ? "YouTube" : "Other",
          thumbnail: "", // Will be auto-fetched by component or we can add logic
          description: "",
          created_at: item.createdAt || new Date().toISOString()
        });
      });
    });

    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error("Video Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, videoUrl, description, thumbnailImageId } = body;

    const mutation = gql`
      mutation CreateVideoGallery($data: VideoGalleryCreateInput!) {
        createVideoGallery(data: $data) {
          id
        }
      }
    `;

    const variables = {
      data: {
        title,
        videoUrl,
        description,
        ...(thumbnailImageId ? { thumbnailImage: { connect: { id: thumbnailImageId } } } : {})
      }
    };

    const res: any = await hygraphAdmin.request(mutation, variables);
    const newId = res.createVideoGallery.id;

    // Publish
    await HygraphService.publishModel("VideoGallery", newId);

    return NextResponse.json({ data: { id: newId, title } });
  } catch (error) {
    console.error("Video Gallery POST error:", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}
