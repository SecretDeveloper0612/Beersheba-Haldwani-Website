import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

export async function GET() {
  try {
    const data: any = await HygraphService.getHeroSliders();
    return NextResponse.json({ data: data.heroSliders ?? [] });
  } catch (error) {
    console.error("Hero Slider GET error:", error);
    return NextResponse.json({ error: "Failed to fetch hero slider" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, slideOrder, buttonText, buttonLink, imageId } = body;

    const mutation = gql`
      mutation CreateHeroSlider($data: HeroSliderCreateInput!) {
        createHeroSlider(data: $data) {
          id
        }
      }
    `;

    const variables = {
      data: {
        title,
        description,
        slideOrder: parseInt(slideOrder) || 0,
        buttonText,
        buttonLink,
        ...(imageId ? { image: { connect: { id: imageId } } } : {})
      }
    };

    const res: any = await hygraphAdmin.request(mutation, variables);
    const newId = res.createHeroSlider.id;

    // Publish
    await HygraphService.publishModel("HeroSlider", newId);

    return NextResponse.json({ data: { id: newId, title } });
  } catch (error) {
    console.error("Hero Slider POST error:", error);
    return NextResponse.json({ error: "Failed to add slide" }, { status: 500 });
  }
}
