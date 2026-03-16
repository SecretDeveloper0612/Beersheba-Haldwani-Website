import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// PUT /api/gallery/albums/[id] - Update an album
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const params = await props.params;
    const { id } = params;
    const { id: _, updated_at: __, ...rest } = body;

    const columns = Object.keys(rest);
    const values = Object.values(rest);
    
    if (columns.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const sql = `UPDATE gallery_albums SET ${setClause} WHERE id = ?`;
    await query(sql, [...values, id]);

    const [updated] = (await query("SELECT * FROM gallery_albums WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Gallery Album PUT error:", error);
    return NextResponse.json({ error: "Failed to update album" }, { status: 500 });
  }
}

// DELETE /api/gallery/albums/[id] - Delete an album and its images
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    await query("DELETE FROM gallery_albums WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery Album DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete album" }, { status: 500 });
  }
}
