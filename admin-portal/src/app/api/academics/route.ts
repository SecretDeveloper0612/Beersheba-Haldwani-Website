import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/academics - Fetch all academic programs
export async function GET() {
  try {
    const data = await query("SELECT * FROM academic_programs ORDER BY sort_order");
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Academics GET error:", error);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// POST /api/academics - Create new academic program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: _, updated_at: __, ...rest } = body;
    
    if (rest.highlights && Array.isArray(rest.highlights)) {
      rest.highlights = JSON.stringify(rest.highlights);
    }

    const id = uuidv4();
    const columns = Object.keys(rest);
    const values = Object.values(rest);
    
    const sql = `INSERT INTO academic_programs (id, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`;
    await query(sql, [id, ...values]);

    const [program] = (await query("SELECT * FROM academic_programs WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: program });
  } catch (error) {
    console.error("Academics POST error:", error);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
