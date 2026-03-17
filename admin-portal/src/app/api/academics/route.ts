import { NextRequest, NextResponse } from "next/server";
import { HygraphService } from "@/lib/hygraph-service";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

export async function GET() {
  try {
    const data: any = await HygraphService.getAcademicPrograms();
    return NextResponse.json({ data: data.academicPrograms ?? [] });
  } catch (error) {
    console.error("Academic Programs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch academic programs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { programName, description, category, imageId } = body;

    const mutation = gql`
      mutation CreateAcademicProgram($data: AcademicProgramCreateInput!) {
        createAcademicProgram(data: $data) {
          id
        }
      }
    `;

    const variables = {
      data: {
        programName,
        description,
        category,
        ...(imageId ? { image: { connect: { id: imageId } } } : {})
      }
    };

    const res: any = await hygraphAdmin.request(mutation, variables);
    const newId = res.createAcademicProgram.id;

    // Publish
    await HygraphService.publishModel("AcademicProgram", newId);

    return NextResponse.json({ data: { id: newId, programName } });
  } catch (error) {
    console.error("Academic Programs POST error:", error);
    return NextResponse.json({ error: "Failed to add program" }, { status: 500 });
  }
}
