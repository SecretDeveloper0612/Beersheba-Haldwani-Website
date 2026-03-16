import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/video-gallery - Fetch all videos
export async function GET() {
  try {
    const data = await query("SELECT * FROM video_gallery ORDER BY sort_order ASC");
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Video Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

// POST /api/video-gallery - Add a new video
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, video_url, source, duration, description, is_active, sort_order } = body;

    const id = uuidv4();
    await query(
      `INSERT INTO video_gallery (id, title, video_url, source, duration, description, is_active, sort_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, video_url, source ?? "YouTube", duration, description, is_active ?? true, sort_order ?? 0]
    );

    const [video] = (await query("SELECT * FROM video_gallery WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: video });
  } catch (error) {
    console.error("Video Gallery POST error:", error);
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 });
  }
}
