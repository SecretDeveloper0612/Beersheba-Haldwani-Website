import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/seo - Fetch all SEO settings
export async function GET() {
  try {
    const data = await query("SELECT * FROM seo_settings ORDER BY page_path") as any[];
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("SEO GET error:", error);
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

// PUT /api/seo - Update SEO settings for a page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_path, ...rest } = body;

    if (!page_path) return NextResponse.json({ error: "page_path is required" }, { status: 400 });

    const { id: _, created_at: __, updated_at: ___, ...updateData } = rest;
    const fields = Object.keys(updateData);
    const placeholders = fields.map(() => "?").join(", ");
    const cols = fields.join(", ");
    const updateClause = fields.map(f => `${f} = VALUES(${f})`).join(", ");

    // Using ON DUPLICATE KEY UPDATE for upsert behavior
    await query(
      `INSERT INTO seo_settings (page_path, ${cols}, updated_at) 
       VALUES (?, ${placeholders}, NOW()) 
       ON DUPLICATE KEY UPDATE ${updateClause}, updated_at = NOW()`,
      [page_path, ...Object.values(updateData)]
    );

    const [data] = await query("SELECT * FROM seo_settings WHERE page_path = ?", [page_path]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("SEO PUT error:", error);
    return NextResponse.json({ error: "Failed to update SEO settings" }, { status: 500 });
  }
}
