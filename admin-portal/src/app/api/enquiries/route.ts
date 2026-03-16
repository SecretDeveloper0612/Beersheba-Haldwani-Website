import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/enquiries - Fetch contact form enquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = "SELECT * FROM contact_enquiries";
    const params: any[] = [];

    if (status && status !== "All") {
      sql += " WHERE status = ?";
      params.push(status);
    }

    sql += " ORDER BY created_at DESC";

    const data = await query(sql, params) as any[];
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Enquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

// PATCH /api/enquiries - Update enquiry status/starred
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const fields = Object.keys(updates);
    if (fields.length === 0) {
       return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const params = [...Object.values(updates), id];

    await query(`UPDATE contact_enquiries SET ${setClause} WHERE id = ?`, params);

    const [data] = await query("SELECT * FROM contact_enquiries WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Enquiries PATCH error:", error);
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  }
}
