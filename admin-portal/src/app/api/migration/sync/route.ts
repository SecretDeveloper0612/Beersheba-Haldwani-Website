import { NextResponse } from "next/server";
import { MigrationService } from "@/lib/migration";

export async function POST() {
  const service = new MigrationService();
  try {
    await service.syncData();
    return NextResponse.json({ success: true, message: "Sync execution sequence initialized cleanly." });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
