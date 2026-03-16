import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// PUT /api/tc/[id] - Update TC record
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const params = await props.params;
    const { id } = params;

    const { id: _, created_at, updated_at, ...updates } = body;
    const fields = Object.keys(updates);
    if (fields.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });

    const setClause = fields.map(f => `${f} = ?`).join(", ");
    const paramsList = [...Object.values(updates), id];

    await query(
      `UPDATE transfer_certificates SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      paramsList
    );

    const [data] = await query("SELECT * FROM transfer_certificates WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("TC PUT error:", error);
    return NextResponse.json({ error: "Failed to update TC" }, { status: 500 });
  }
}

// DELETE /api/tc/[id]
export async function DELETE(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await query("DELETE FROM transfer_certificates WHERE id = ?", [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TC DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete TC" }, { status: 500 });
  }
}
