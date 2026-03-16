import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

// POST /api/upload - Upload file to Local Storage (public/uploads)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "others";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const relativePath = `/uploads/${folder}/${fileName}`;
    const absoluteDirectory = path.join(process.cwd(), "public", "uploads", folder);
    const absolutePath = path.join(absoluteDirectory, fileName);

    // Ensure directory exists
    await fs.mkdir(absoluteDirectory, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(absolutePath, buffer);

    const publicUrl = relativePath;

    // Save to media library (MySQL)
    const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document";
    const id = uuidv4();
    
    await query(
      `INSERT INTO media_library (id, file_name, file_url, file_type, file_size, mime_type, folder) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, file.name, publicUrl, fileType, file.size, file.type, folder]
    );

    return NextResponse.json({ url: publicUrl, path: relativePath });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file: " + error.message }, { status: 500 });
  }
}

// GET /api/upload (media library)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const folder = searchParams.get("folder");

    let sql = "SELECT * FROM media_library";
    let params: any[] = [];
    let conditions: string[] = [];

    if (type) {
      conditions.push("file_type = ?");
      params.push(type);
    }
    if (folder) {
      conditions.push("folder = ?");
      params.push(folder);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY created_at DESC";

    const data = await query(sql, params);
    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    console.error("Fetch Media error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
