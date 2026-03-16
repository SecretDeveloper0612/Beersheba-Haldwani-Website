import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/admissions - Fetch all admission enquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let sql = "SELECT * FROM admission_enquiries";
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== "all") {
      conditions.push("status = ?");
      params.push(status);
    }

    if (search) {
      conditions.push("(student_name LIKE ? OR phone LIKE ? OR parent_name LIKE ?)");
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY created_at DESC";

    const data = await query(sql, params) as any[];

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Admissions GET error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

// POST /api/admissions - Submit new admission enquiry (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { student_name, parent_name, phone, email, class_seeking, message } = body;

    if (!student_name || !parent_name || !phone || !class_seeking) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const id = uuidv4();
    await query(
      `INSERT INTO admission_enquiries (id, student_name, parent_name, phone, email, class_seeking, message, status, source) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, student_name, parent_name, phone, email, class_seeking, message, "new", "website"]
    );

    const [data] = await query("SELECT * FROM admission_enquiries WHERE id = ?", [id]) as any[];

    return NextResponse.json({ data, message: "Enquiry submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Admissions POST error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
