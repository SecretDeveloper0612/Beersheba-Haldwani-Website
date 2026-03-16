import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/gallery/images - Fetch images (optionally filter by album_id)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const album_id = searchParams.get("album_id");

    let sql = "SELECT * FROM gallery_images";
    let params: any[] = [];

    if (album_id) {
      sql += " WHERE album_id = ?";
      params.push(album_id);
    }
    
    sql += " ORDER BY created_at DESC";
    const data = await query(sql, params);

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Gallery Images GET error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// POST /api/gallery/images - Add images to an album
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    const items = Array.isArray(body) ? body : [body];
    
    const results = [];
    for (const item of items) {
      const id = uuidv4();
      const columns = Object.keys(item);
      const values = Object.values(item);
      
      const sql = `INSERT INTO gallery_images (id, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`;
      await query(sql, [id, ...values]);
      
      const [inserted] = (await query("SELECT * FROM gallery_images WHERE id = ?", [id])) as any[];
      results.push(inserted);
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Gallery Image POST error:", error);
    return NextResponse.json({ error: "Failed to add images" }, { status: 500 });
  }
}
