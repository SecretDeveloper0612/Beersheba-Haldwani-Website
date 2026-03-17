import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { programName, description, category, imageId } = body;

    const updateData: any = {
      programName,
      description,
      category,
    };

    if (imageId) {
      updateData.image = { connect: { id: imageId } };
    }

    await HygraphService.updateAcademicProgram(id, updateData);
    await HygraphService.publishModel("AcademicProgram", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Academics PUT error:", error);
    return NextResponse.json({ error: "Failed to update program in Hygraph" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await HygraphService.deleteAcademicProgram(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Academics DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete program from Hygraph" }, { status: 500 });
  }
}
