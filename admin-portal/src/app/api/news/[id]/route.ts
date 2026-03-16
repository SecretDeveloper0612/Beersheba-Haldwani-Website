import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { id: _, created_at, updated_at, views, ...updates } = body;

    const columns = Object.keys(updates);
    const values = Object.values(updates);
    
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const sql = `UPDATE news_events SET ${setClause} WHERE id = ?`;
    await query(sql, [...values, id]);

    const [post] = (await query("SELECT * FROM news_events WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: post });
  } catch (error) {
    console.error("News PUT error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM news_events WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("News DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
