"use server";

import { server_query_function } from "@/lib/graphql";
import { gql } from "graphql-request";

export async function verifyTransferCertificate(formData: FormData) {
  const searchBy = formData.get("searchBy") as string;
  const searchValue = formData.get("searchValue") as string;

  if (!searchBy || !searchValue) {
    return { error: "Please provide search criteria and value." };
  }

  let filter = "";
  if (searchBy === "tcNumber") {
    filter = `tcNumber: "${searchValue}"`;
  } else if (searchBy === "studentName") {
    filter = `studentName_contains: "${searchValue}"`;
  } else if (searchBy === "admissionNumber") {
    filter = `admissionNumber: "${searchValue}"`;
  } else if (searchBy === "dob") {
    filter = `dob: "${searchValue}"`;
  }

  const query = gql`
    query GetTC {
      transferCertificates(where: { ${filter} }) {
        id
        tcNumber
        studentName
        admissionNumber
        fatherName
        studentClass
        issueDate
        dob
        status
      }
    }
  `;

  try {
    const response = (await server_query_function(query)) as TCResponse;
    const certificates = response?.transferCertificates || [];

    if (certificates.length === 0) {
      return { error: "No Transfer Certificate found with the provided information." };
    }

    return { data: certificates[0] };
  } catch (err) {
    console.error("TC Verification Error:", err);
    return { error: "An error occurred while verifying the certificate. Please try again later." };
  }
}
