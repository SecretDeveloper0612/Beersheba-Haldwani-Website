import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/about - Fetch school about content
export async function GET() {
  try {
    const results = await query("SELECT * FROM about_content LIMIT 1") as any[];
    return NextResponse.json({ data: results[0] || null });
  } catch (error) {
    console.error("About GET error:", error);
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
  }
}

// PUT /api/about - Update school about content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: _, updated_at: __, ...updates } = body;

    const fields = Object.keys(updates);
    if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    const cols = fields.join(", ");
    const placeholders = fields.map(() => "?").join(", ");
    const updateClause = fields.map(f => `${f} = VALUES(${f})`).join(", ");

    // Using a fixed ID for singleton about content
    const id = "00000000-0000-0000-0000-000000000001";
    
    await query(
      `INSERT INTO about_content (id, ${cols}, updated_at) 
       VALUES (?, ${placeholders}, NOW()) 
       ON DUPLICATE KEY UPDATE ${updateClause}, updated_at = NOW()`,
      [id, ...Object.values(updates)]
    );

    const [data] = await query("SELECT * FROM about_content WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("About PUT error:", error);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
