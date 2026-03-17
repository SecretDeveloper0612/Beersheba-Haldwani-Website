import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, designation, department, qualification, imageId, imageUrl } = body;

    const data: any = {
      name,
      designation,
      department,
      qualification,
    };

    if (imageId) {
      data.image = { connect: { id: imageId } };
    } else if (imageUrl) {
      // If we only have URL, we can't easily connect as Asset id is needed.
      // But HygraphService.updateTeacher might need a specific structure.
    }

    await HygraphService.updateTeacher(id, data);
    await HygraphService.publishModel("Teacher", id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Teachers PUT error:", error);
    return NextResponse.json({ error: "Failed to update teacher in Hygraph" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await HygraphService.deleteTeacher(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Teachers DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete teacher from Hygraph" }, { status: 500 });
  }
}
