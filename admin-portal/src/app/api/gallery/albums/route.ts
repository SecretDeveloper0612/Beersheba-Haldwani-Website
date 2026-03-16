import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/gallery/albums - Fetch all albums
export async function GET() {
  try {
    const data = await query("SELECT * FROM gallery_albums ORDER BY created_at DESC");
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Gallery Albums GET error:", error);
    return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
  }
}

// POST /api/gallery/albums - Create a new album
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, cover_image, category } = body;

    const id = uuidv4();
    await query(
      `INSERT INTO gallery_albums (id, name, description, cover_image, is_active) 
       VALUES (?, ?, ?, ?, ?)`,
      [id, title || body.name, description, cover_image, true]
    );

    const [album] = (await query("SELECT * FROM gallery_albums WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: album });
  } catch (error) {
    console.error("Gallery Album POST error:", error);
    return NextResponse.json({ error: "Failed to create album" }, { status: 500 });
  }
}
