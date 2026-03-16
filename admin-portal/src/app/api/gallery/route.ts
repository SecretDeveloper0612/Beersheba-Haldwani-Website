import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/gallery - Fetch albums with image counts
export async function GET() {
  try {
    const albums = await query("SELECT * FROM gallery_albums ORDER BY sort_order");
    const images = await query("SELECT * FROM gallery_images WHERE is_active = true ORDER BY sort_order");

    return NextResponse.json({ albums: albums ?? [], images: images ?? [] });
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// POST /api/gallery/albums - Create new album
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) return NextResponse.json({ error: "Album name is required" }, { status: 400 });

    const id = uuidv4();
    await query(
      "INSERT INTO gallery_albums (id, name, description) VALUES (?, ?, ?)",
      [id, name, description]
    );

    const [album] = (await query("SELECT * FROM gallery_albums WHERE id = ?", [id])) as any[];
    
    return NextResponse.json({ data: album }, { status: 201 });
  } catch (error) {
    console.error("Album POST error:", error);
    return NextResponse.json({ error: "Failed to create album" }, { status: 500 });
  }
}
