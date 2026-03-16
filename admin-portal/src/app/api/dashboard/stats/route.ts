import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/dashboard/stats - Aggregate stats for the main dashboard
export async function GET() {
  try {
    const [
      galleryRes,
      videoRes,
      newsRes,
      enquiryRes,
      admissionRes,
      tcRes
    ] = (await Promise.all([
      query("SELECT COUNT(*) as count FROM gallery_images"),
      query("SELECT COUNT(*) as count FROM video_gallery"),
      query("SELECT COUNT(*) as count FROM news_events"),
      query("SELECT COUNT(*) as count FROM contact_enquiries").catch(() => [{ count: 0 }]),
      query("SELECT COUNT(*) as count FROM admission_enquiries WHERE status = 'new'").catch(() => [{ count: 0 }]),
      query("SELECT COUNT(*) as count FROM transfer_certificates WHERE is_verified = true").catch(() => [{ count: 0 }]),
    ])) as any[][];

    return NextResponse.json({
      data: {
        galleryImages: galleryRes[0]?.count || 0,
        totalVideos: videoRes[0]?.count || 0,
        eventsThisMonth: newsRes[0]?.count || 0, 
        totalEnquiries: enquiryRes[0]?.count || 0,
        pendingAdmissions: admissionRes[0]?.count || 0,
        verifiedTCs: tcRes[0]?.count || 0,
      }
    });
  } catch (error) {
    console.error("Dashboard stats GET error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
