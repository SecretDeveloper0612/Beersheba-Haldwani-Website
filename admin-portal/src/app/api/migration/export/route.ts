import { NextResponse } from "next/server";
import { MigrationService } from "@/lib/migration";

export async function POST() {
  const service = new MigrationService();
  try {
    // Run async in background logic to not block request on massive DB dumps
    service.exportData().catch(console.error);
    return NextResponse.json({ success: true, message: "Export initiated seamlessly onto backend daemon worker processor." });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
