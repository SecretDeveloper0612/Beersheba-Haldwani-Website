import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

// GET /api/tc - Fetch all TCs or search by TC number
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tcNumber = searchParams.get("tc_number");

    // Public TC verification query (by TC number)
    if (tcNumber) {
      const data: any = await HygraphService.getTCs(); // This is inefficient for single fetch, but works for now.
      // Better to have a getTCByNumber in HygraphService.
      const found = data.transferCertificates.find((tc: any) => tc.tcNumber === tcNumber.toUpperCase());
      return NextResponse.json({ data: found, found: !!found });
    }

    // Admin: full list
    const data: any = await HygraphService.getTCs();
    return NextResponse.json({ data: data.transferCertificates ?? [] });
  } catch (error) {
    console.error("TC GET error:", error);
    return NextResponse.json({ error: "Failed to fetch TCs from Hygraph" }, { status: 500 });
  }
}

// POST /api/tc - Issue new TC
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tc_number, student_name, father_name, class_at_leaving, date_of_leaving, admission_number } = body;

    const data = {
      tcNumber: tc_number.toUpperCase(),
      studentName: student_name,
      fatherName: father_name,
      studentClass: class_at_leaving,
      issueDate: date_of_leaving,
      admissionNumber: admission_number,
      status: "Verified"
    };

    const res: any = await HygraphService.createTC(data);
    const newId = res.createTransferCertificate.id;

    // Publish
    await HygraphService.publishModel("TransferCertificate", newId);

    return NextResponse.json({ data: { id: newId, tc_number } }, { status: 201 });
  } catch (error) {
    console.error("TC POST error:", error);
    return NextResponse.json({ error: "Failed to issue TC in Hygraph" }, { status: 500 });
  }
}
