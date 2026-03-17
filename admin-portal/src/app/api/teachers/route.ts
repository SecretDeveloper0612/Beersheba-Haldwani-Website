import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

export async function GET() {
  try {
    const data: any = await HygraphService.getTeachers();
    return NextResponse.json({ data: data.teachers ?? [] });
  } catch (error) {
    console.error("Teachers GET error:", error);
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, designation, department, imageId } = body;

    const mutation = gql`
      mutation CreateTeacher($data: TeacherCreateInput!) {
        createTeacher(data: $data) {
          id
        }
      }
    `;

    const variables = {
      data: {
        name,
        designation,
        department,
        ...(imageId ? { image: { connect: { id: imageId } } } : {})
      }
    };

    const res: any = await hygraphAdmin.request(mutation, variables);
    const newId = res.createTeacher.id;

    // Publish
    await HygraphService.publishModel("Teacher", newId);

    return NextResponse.json({ data: { id: newId, name } });
  } catch (error) {
    console.error("Teachers POST error:", error);
    return NextResponse.json({ error: "Failed to add teacher" }, { status: 500 });
  }
}
