import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function GET() {
  try {
    const data: any = await HygraphService.getAssets();
    return NextResponse.json({ data: data.assets ?? [] });
  } catch (error) {
    console.error("Media GET error:", error);
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Asset ID is required" }, { status: 400 });
    }

    await HygraphService.deleteAsset(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
