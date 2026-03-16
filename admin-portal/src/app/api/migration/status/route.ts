import { NextResponse } from "next/server";
import { migrationState } from "@/lib/migration";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(migrationState);
}
