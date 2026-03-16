import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// GET /api/news - Fetch all news and events
export async function GET() {
  try {
    const data = await query("SELECT * FROM news_events ORDER BY created_at DESC");
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("News GET error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// POST /api/news - Create new news/event post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: _, created_at: __, updated_at: ___, views: ____, ...insertData } = body;
    
    const id = uuidv4();
    const columns = Object.keys(insertData);
    const values = Object.values(insertData);
    
    const sql = `INSERT INTO news_events (id, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`;
    await query(sql, [id, ...values]);

    const [post] = (await query("SELECT * FROM news_events WHERE id = ?", [id])) as any[];
    return NextResponse.json({ data: post });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
