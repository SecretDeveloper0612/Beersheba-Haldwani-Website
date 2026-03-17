import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

// GET /api/homepage
export async function GET() {
  try {
    const home = await HygraphService.getHaldwaniHome();
    return NextResponse.json({ 
      content: {
        id: home?.id,
        class_x_heading: home?.classXTopperHeading || "",
        class_x_desc: home?.classXTopperDesc || "",
        class_xii_heading: home?.classXiiTopperHeading || "",
        class_xii_desc: home?.classXiiTopperDesc || "",
        hero_video_url: home?.homeVideoBanner?.[0]?.url || "",
      }
    });
  } catch (error) {
    console.error("Homepage GET error:", error);
    return NextResponse.json({ error: "Failed to fetch homepage content" }, { status: 500 });
  }
}

// PUT /api/homepage
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (content?.id) {
      const updateData: Record<string, string> = {};
      // Only update fields that exist in the HaldwaniHome schema
      if (content.class_x_heading !== undefined) updateData.classXTopperHeading = content.class_x_heading;
      if (content.class_x_desc !== undefined) updateData.classXTopperDesc = content.class_x_desc;
      if (content.class_xii_heading !== undefined) updateData.classXiiTopperHeading = content.class_xii_heading;
      if (content.class_xii_desc !== undefined) updateData.classXiiTopperDesc = content.class_xii_desc;

      if (Object.keys(updateData).length > 0) {
        await HygraphService.updateHaldwaniHome(content.id, updateData);
        await HygraphService.publishModel("HaldwaniHome", content.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Homepage PUT error:", error);
    return NextResponse.json({ error: "Failed to update homepage content" }, { status: 500 });
  }
}
