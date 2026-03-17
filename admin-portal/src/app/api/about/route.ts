import { NextResponse } from "next/server";

// GET /api/about
// The About page content (history, mission, vision, founder, principal) is managed
// directly in Hygraph as those fields don't yet exist in the HaldwaniHome model.
// This endpoint returns static content for now.
export async function GET() {
  return NextResponse.json({
    data: {
      history_heading: "Beersheba School",
      history_text: "Established on July 4, 1977, in the heart of Haldwani, Beersheba School started with just 60 children under the visionary leadership of the late Shri. and Smt. N.N.D. Bhatt. Their dedication and inspiration have been instrumental in shaping the school's growth and commitment to educational excellence. Today Beersheba School stands as a premier co-educational English Medium institution, known for its nurturing environment and comprehensive curriculum.",
      mission_text: "As a co-educational English Medium school, our mission is to provide a nurturing environment that fosters holistic development and prepares students for future challenges and successes.",
      vision_text: "We envision a dynamic learning environment where innovation and excellence converge, empowering students with the skills, knowledge, and values necessary to thrive in a global society.",
      founder_name: "Late Shri. N.N.D. Bhatt",
      founder_quote: "Education is the most powerful weapon which you can use to change the world.",
      principal_name: "Principal, Beersheba School",
      principal_message: "Welcome to Beersheba School, where we nurture young minds and build a foundation for a bright future."
    }
  });
}
