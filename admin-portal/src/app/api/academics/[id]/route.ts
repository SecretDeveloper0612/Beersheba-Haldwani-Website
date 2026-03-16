import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { id: _, updated_at: __, ...updates } = body;

    if (updates.highlights && Array.isArray(updates.highlights)) {
      updates.highlights = JSON.stringify(updates.highlights);
    }

    const columns = Object.keys(updates);
    const values = Object.values(updates);
    
    if (columns.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const sql = `UPDATE academic_programs SET ${setClause} WHERE id = ?`;
    await query(sql, [...values, id]);

    const [program] = (await query("SELECT * FROM academic_programs WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: program });
  } catch (error) {
    console.error("Academics PUT error:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM academic_programs WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Academics DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
