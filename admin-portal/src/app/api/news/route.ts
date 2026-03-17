import { NextRequest, NextResponse } from "next/server";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";
import { HygraphService } from "@/lib/hygraph-service";

// GET /api/news - Fetch all news and events from Hygraph
export async function GET() {
  try {
    const data: any = await HygraphService.getAllNews();
    const mapped = (data.newsEvents || []).map((item: any) => {
      let imageUrl = item.newsImage?.url;
      
      // Fallback: extract image from HTML if newsImage is missing
      if (!imageUrl && item.newsDesc?.html) {
        const matches = item.newsDesc.html.match(/<img[^>]+src="([^">]+)"/);
        if (matches && matches[1]) {
          imageUrl = matches[1];
        }
      }

      return {
        id: item.id,
        title: item.newsHeading,
        content: item.newsDesc?.html || item.newsDesc?.text || "",
        featuredImage: imageUrl ? { url: imageUrl } : null,
        status: item.status,
        createdAt: item.createdAt,
        category: item.category || "Announcement",
        eventDate: item.eventDate || item.createdAt?.split('T')[0],
        eventLocation: "Main Campus"
      };
    });
    return NextResponse.json({ data: mapped });
  } catch (error) {
    console.error("News GET error:", error);
    return NextResponse.json({ error: "Failed to fetch news from Hygraph" }, { status: 500 });
  }
}

// POST /api/news - Create new news/event post in Hygraph
export async function POST(request: NextRequest) {
  const mutation = gql`
    mutation CreateNewsEvent($data: NewsEventCreateInput!) {
      createNewsEvent(data: $data) {
        id
        title
      }
      publishNewsEvent(where: { id: "" }, to: PUBLISHED) {
        id
      }
    }
  `;

  // Note: Hygraph mutations require publishing to be visible if not using draft.
  // The client usually handles the ID for publishing after creation.
  
  try {
    const body = await request.json();
    const { title, content, excerpt, featuredImageUrl, category, eventDate, status } = body;

    // First mutation to create
    const createMutation = gql`
      mutation CreateNewsEvent($data: NewsEventCreateInput!) {
        createNewsEvent(data: $data) {
          id
        }
      }
    `;

    const variables = {
      data: {
        title,
        content,
        excerpt,
        category,
        eventDate,
        status: status === 'published' ? 'PUBLISHED' : 'DRAFT',
        // If featuredImageUrl is provided, we might need to connect an asset or just save URL if it's a string field
        // Assuming featuredImage is an Asset relation in Hygraph:
        // featuredImage: { connect: { id: assetId } }
        // For now, let's assume it's simple or handled by the frontend passing asset ID
      }
    };

    const createRes: any = await hygraphAdmin.request(createMutation, variables);
    const newId = createRes.createNewsEvent.id;

    // If status is published, publish it
    if (status === 'published') {
      const publishMutation = gql`
        mutation PublishNewsEvent($id: ID!) {
          publishNewsEvent(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `;
      await hygraphAdmin.request(publishMutation, { id: newId });
    }

    return NextResponse.json({ data: { id: newId, title } });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json({ error: "Failed to create post in Hygraph" }, { status: 500 });
  }
}
