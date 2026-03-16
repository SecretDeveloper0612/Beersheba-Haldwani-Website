import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/tc - Fetch all TCs or search by TC number
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const tcNumber = searchParams.get("tc_number");

    // Public TC verification query (by TC number)
    if (tcNumber) {
      const results = await query(
        `SELECT tc_number, student_name, father_name, class_at_leaving, date_of_leaving, conduct, is_verified, admission_number 
         FROM transfer_certificates 
         WHERE tc_number = ? AND is_verified = true`,
        [tcNumber.toUpperCase()]
      ) as any[];

      const data = results[0] || null;
      return NextResponse.json({ data, found: !!data });
    }

    // Admin: full list with search
    let sql = "SELECT * FROM transfer_certificates";
    const params: any[] = [];
    
    if (search) {
      sql += " WHERE tc_number LIKE ? OR student_name LIKE ? OR admission_number LIKE ?";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    sql += " ORDER BY created_at DESC";

    const data = await query(sql, params) as any[];
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("TC GET error:", error);
    return NextResponse.json({ error: "Failed to fetch TCs" }, { status: 500 });
  }
}

// POST /api/tc - Issue new TC
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tc_number, student_name, father_name, class_at_leaving, date_of_leaving } = body;

    if (!tc_number || !student_name || !father_name || !class_at_leaving || !date_of_leaving) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const id = uuidv4();
    try {
      await query(
        `INSERT INTO transfer_certificates 
         (id, tc_number, student_name, father_name, class_at_leaving, date_of_leaving, admission_number, is_verified) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, tc_number.toUpperCase(), student_name, father_name, class_at_leaving, date_of_leaving, body.admission_number, true]
      );
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
        return NextResponse.json({ error: "TC number already exists" }, { status: 409 });
      }
      throw error;
    }

    const [data] = await query("SELECT * FROM transfer_certificates WHERE id = ?", [id]) as any[];
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("TC POST error:", error);
    return NextResponse.json({ error: "Failed to issue TC" }, { status: 500 });
  }
}
