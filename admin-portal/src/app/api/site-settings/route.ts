import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/site-settings - Fetch global site settings
export async function GET() {
  try {
    const results = (await query("SELECT * FROM site_settings LIMIT 1")) as any[];
    return NextResponse.json({ data: results[0] || {} });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT /api/site-settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, updated_at, ...rest } = body;

    const existing = (await query("SELECT id FROM site_settings LIMIT 1")) as any[];
    
    if (existing.length > 0) {
      const targetId = existing[0].id;
      const columns = Object.keys(rest);
      const values = Object.values(rest);
      
      const setClause = columns.map((col) => `${col} = ?`).join(", ");
      const sql = `UPDATE site_settings SET ${setClause} WHERE id = ?`;
      await query(sql, [...values, targetId]);
      
      const [updated] = (await query("SELECT * FROM site_settings WHERE id = ?", [targetId])) as any[];
      return NextResponse.json({ data: updated });
    } else {
      const newId = uuidv4();
      const columns = Object.keys(rest);
      const values = Object.values(rest);
      
      const sql = `INSERT INTO site_settings (id, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`;
      await query(sql, [newId, ...values]);
      
      const [inserted] = (await query("SELECT * FROM site_settings WHERE id = ?", [newId])) as any[];
      return NextResponse.json({ data: inserted });
    }
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
