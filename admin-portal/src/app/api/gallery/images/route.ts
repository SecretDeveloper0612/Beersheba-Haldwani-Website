import { NextRequest, NextResponse } from "next/server";
import { hygraphAdmin } from "@/lib/hygraph";
import { HygraphService } from "@/lib/hygraph-service";
import { gql } from "graphql-request";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { caption, image_url, image_id, album_id } = body;

    const mutation = gql`
      mutation CreateGalleryImage($data: GalleryImageCreateInput!) {
        createGalleryImage(data: $data) {
          id
        }
      }
    `;

    // Handle both direct asset ID or external URL
    // This depends on how the Hygraph model is structured.
    // Assuming 'image' is an Asset relation.
    const variables = {
      data: {
        caption,
        ...(image_id ? { image: { connect: { id: image_id } } } : {}),
        // If the model supports external URL, add it here, otherwise we assume asset connection
        album: { connect: { id: album_id } }
      }
    };

    const res: any = await hygraphAdmin.request(mutation, variables);
    const newId = res.createGalleryImage.id;

    // Publish
    await HygraphService.publishModel("GalleryImage", newId);

    return NextResponse.json({ data: { id: newId } });
  } catch (error) {
    console.error("Gallery Image POST error:", error);
    return NextResponse.json({ error: "Failed to add image to gallery" }, { status: 500 });
  }
}
