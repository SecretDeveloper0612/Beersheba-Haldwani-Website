import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/homepage - Fetch homepage content + sliders + highlights
export async function GET() {
  try {
    const contentRes = await query("SELECT * FROM homepage_content LIMIT 1") as any[];
    const sliders = await query("SELECT * FROM slider_images WHERE is_active = true ORDER BY sort_order") as any[];
    const highlights = await query("SELECT * FROM homepage_highlights WHERE is_active = true ORDER BY sort_order") as any[];

    return NextResponse.json({ 
      content: contentRes[0] || null, 
      sliders: sliders ?? [], 
      highlights: highlights ?? [] 
    });
  } catch (error) {
    console.error("Homepage GET error:", error);
    return NextResponse.json({ error: "Failed to fetch homepage content" }, { status: 500 });
  }
}

// PUT /api/homepage - Update homepage content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body;

    if (content) {
      const { id: _, created_at: __, updated_at: ___, ...updateData } = content;
      const fields = Object.keys(updateData);
      if (fields.length > 0) {
        const setClause = fields.map(f => `${f} = ?`).join(", ");
        const params = [...Object.values(updateData)];
        
        // Use a fixed ID or first record for settings
        await query(
          `UPDATE homepage_content SET ${setClause}, updated_at = NOW() WHERE id = ? OR 1=1 LIMIT 1`,
          [...params, "00000000-0000-0000-0000-000000000002"]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Homepage PUT error:", error);
    return NextResponse.json({ error: "Failed to update homepage content" }, { status: 500 });
  }
}

// POST /api/homepage/slider - Add slider image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_url, caption, link_url, sort_order } = body;

    const id = uuidv4();
    await query(
      `INSERT INTO slider_images (id, image_url, caption, link_url, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, image_url, caption, link_url, sort_order ?? 0, true]
    );

    const [data] = await query("SELECT * FROM slider_images WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Slider POST error:", error);
    return NextResponse.json({ error: "Failed to add slider image" }, { status: 500 });
  }
}
