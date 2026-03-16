import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { id: _, created_at, updated_at, ...updates } = body;

    const fields = Object.keys(updates);
    if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    const setClause = fields.map(f => `${f} = ?`).join(", ");
    const paramsList = [...Object.values(updates), id];

    await query(
      `UPDATE facilities SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      paramsList
    );

    const [data] = await query("SELECT * FROM facilities WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Facilities PUT error:", error);
    return NextResponse.json({ error: "Failed to update facility" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM facilities WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Facilities DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete facility" }, { status: 500 });
  }
}
