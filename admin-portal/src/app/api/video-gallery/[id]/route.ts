import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// PUT /api/video-gallery/[id] - Update a video
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const params = await props.params;
    const { id } = params;
    const { id: _, updated_at: __, ...updates } = body;

    const columns = Object.keys(updates);
    const values = Object.values(updates);
    
    if (columns.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const sql = `UPDATE video_gallery SET ${setClause} WHERE id = ?`;
    await query(sql, [...values, id]);

    const [video] = (await query("SELECT * FROM video_gallery WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: video });
  } catch (error) {
    console.error("Video Gallery PUT error:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}

// DELETE /api/video-gallery/[id] - Delete a video
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    await query("DELETE FROM video_gallery WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Video Gallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
