import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function GET() {
  try {
    const data: any = await HygraphService.getAllBlogs();
    return NextResponse.json({ data: data.haldwaniBlogs ?? [] });
  } catch (error) {
    console.error("Blogs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, shortDesc, content, mainImageId } = body;

    const data = {
      title,
      slug,
      shortDesc,
      content: { html: content },
      ...(mainImageId ? { mainImage: { connect: { id: mainImageId } } } : {})
    };

    const res: any = await HygraphService.createBlog(data);
    const newId = res.id;

    await HygraphService.publishModel("HaldwaniBlog", newId);

    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    console.error("Blogs POST error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
