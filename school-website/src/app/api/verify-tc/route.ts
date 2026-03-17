import { NextRequest, NextResponse } from "next/server";
import { server_query_function } from "@/lib/graphql";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchType, value } = body;

    if (!searchType || !value) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let filterString = "";
    
    // Construct dynamic filter based on searchType
    switch (searchType) {
      case "tcNumber":
        filterString = `tcNumber: "${value}"`;
        break;
      case "studentName":
        filterString = `studentName_contains: "${value}"`;
        break;
      case "admissionNumber":
        filterString = `admissionNumber: "${value}"`;
        break;
      case "dateOfBirth":
        filterString = `dob: "${value}"`;
        break;
      default:
        return NextResponse.json({ error: "Invalid search type" }, { status: 400 });
    }

    const query = `
      query SearchTC {
        transferCertificates(where: { ${filterString} }, first: 1) {
          id
          tcNumber
          studentName
          fatherName
          studentClass
          admissionNumber
          dob
          issueDate
          status
        }
      }
    `;

    const response: any = await server_query_function(query);
    const tcRecord = response?.transferCertificates?.[0];

    if (!tcRecord) {
      return NextResponse.json({ error: "Record Not Found" }, { status: 404 });
    }

    return NextResponse.json({ data: tcRecord });
  } catch (error: any) {
    console.error("TC Verification Error:", error);
    return NextResponse.json({ error: "Server error or invalid query" }, { status: 500 });
  }
}
