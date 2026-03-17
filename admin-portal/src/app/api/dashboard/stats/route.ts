import { NextResponse } from "next/server";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

// GET /api/dashboard/stats - Aggregate stats for the main dashboard
export async function GET() {
  const query = gql`
    query DashboardStats {
      newsEventsConnection {
        aggregate {
          count
        }
      }
      imageGalleriesConnection {
        aggregate {
          count
        }
      }
      haldwaniVideoGalleriesConnection {
        aggregate {
          count
        }
      }
      haldwaniBlogsConnection {
        aggregate {
          count
        }
      }
      academicProgramsConnection {
        aggregate {
          count
        }
      }
      teachersConnection {
        aggregate {
          count
        }
      }
    }
  `;

  try {
    const data: any = await hygraphAdmin.request(query);

    return NextResponse.json({
      data: {
        newsEvents: data.newsEventsConnection?.aggregate?.count || 0,
        galleryAlbums: data.imageGalleriesConnection?.aggregate?.count || 0,
        totalVideos: data.haldwaniVideoGalleriesConnection?.aggregate?.count || 0,
        totalArticles: data.haldwaniBlogsConnection?.aggregate?.count || 0,
        academicPrograms: data.academicProgramsConnection?.aggregate?.count || 0,
        totalTeachers: data.teachersConnection?.aggregate?.count || 0,
      }
    });
  } catch (error) {
    console.error("Dashboard stats GET error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
