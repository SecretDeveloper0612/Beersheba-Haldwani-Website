import { NextResponse } from "next/server";

// NOTE: The 'facilities' model does not exist in the current Hygraph schema.
// Returning static facilities data until the model is created in Hygraph.

const STATIC_FACILITIES = [
  {
    id: "library",
    title: "Library & Resource Centre",
    description: "Our well-stocked library houses thousands of books, periodicals, and digital resources to encourage reading habits and independent research.",
    image: { url: "/assets/image/beershiba-2.jpeg" },
  },
  {
    id: "labs",
    title: "Science Laboratories",
    description: "State-of-the-art science labs with modern instruments for Physics, Chemistry, and Biology experiments.",
    image: { url: "/assets/image/beershiba-6.jpeg" },
  },
  {
    id: "sports",
    title: "Sports & Games",
    description: "Extensive sports facilities including a large playground, court sports, and indoor games to build teamwork and leadership.",
    image: { url: "/assets/image/aboutImage.jpg" },
  },
  {
    id: "computer",
    title: "Computer Lab",
    description: "A modern computer laboratory with high-speed internet for programming, digital literacy, AI, and Coding courses.",
    image: { url: "/assets/image/beershiba-2.jpeg" },
  },
];

export async function GET() {
  return NextResponse.json({ data: STATIC_FACILITIES });
}

// POST is disabled until the Facility model is added in Hygraph
export async function POST() {
  return NextResponse.json(
    { error: "Facility creation is not yet available. Please add a 'Facility' model to your Hygraph schema first." },
    { status: 501 }
  );
}
