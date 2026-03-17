import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tc_number, student_name, father_name, class_at_leaving, date_of_leaving, admission_number, is_verified, conduct } = body;

    const data: any = {
      tcNumber: tc_number?.toUpperCase(),
      studentName: student_name,
      fatherName: father_name,
      studentClass: class_at_leaving,
      issueDate: date_of_leaving,
      admissionNumber: admission_number,
      status: is_verified ? "Verified" : "Pending",
      conductRemark: conduct
    };

    // Remove undefined fields
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

    await HygraphService.updateTC(id, data);
    await HygraphService.publishModel("TransferCertificate", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TC PUT error:", error);
    return NextResponse.json({ error: "Failed to update TC in Hygraph" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await HygraphService.deleteTC(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TC DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete TC from Hygraph" }, { status: 500 });
  }
}
