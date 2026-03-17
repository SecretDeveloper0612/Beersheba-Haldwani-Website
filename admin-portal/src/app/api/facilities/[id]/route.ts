import { NextResponse } from "next/server";

// NOTE: The 'Facility' model does not exist in the current Hygraph schema.
// These endpoints are stubs until the model is created.

export async function PUT() {
  return NextResponse.json(
    { error: "Facility updates not available. Please add a 'Facility' model to your Hygraph schema first." },
    { status: 501 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Facility deletion not available. Please add a 'Facility' model to your Hygraph schema first." },
    { status: 501 }
  );
}
