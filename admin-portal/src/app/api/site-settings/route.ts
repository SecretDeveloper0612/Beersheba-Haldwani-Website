import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function GET() {
  try {
    const data: any = await HygraphService.getSiteSettings();
    return NextResponse.json({ data: data.siteSettings?.[0] || {} });
  } catch (error) {
    console.error("Site Settings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required to update settings" }, { status: 400 });
    }

    await HygraphService.updateSiteSettings(id, updates);
    await HygraphService.publishModel("SiteSettings", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Site Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
