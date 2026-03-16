import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/facilities - Fetch all facilities
export async function GET() {
  try {
    const data = await query("SELECT * FROM facilities ORDER BY sort_order") as any[];
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Facilities GET error:", error);
    return NextResponse.json({ error: "Failed to fetch facilities" }, { status: 500 });
  }
}

// POST /api/facilities - Create new facility
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: _, created_at: __, updated_at: ___, ...insertData } = body;
    
    const id = uuidv4();
    const fields = Object.keys(insertData);
    const placeholders = fields.map(() => "?").join(", ");
    const cols = fields.join(", ");
    const params = Object.values(insertData);

    await query(
      `INSERT INTO facilities (id, ${cols}, updated_at) VALUES (?, ${placeholders}, NOW())`,
      [id, ...params]
    );

    const [data] = await query("SELECT * FROM facilities WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Facilities POST error:", error);
    return NextResponse.json({ error: "Failed to create facility" }, { status: 500 });
  }
}
