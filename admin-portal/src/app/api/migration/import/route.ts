import { NextResponse } from "next/server";
import { MigrationService } from "@/lib/migration";

export async function POST() {
  const service = new MigrationService();
  try {
    service.importData().catch(console.error);
    return NextResponse.json({ success: true, message: "Import and structured insertion protocol pipeline active." });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
