import { NextRequest, NextResponse } from "next/server";
import { hygraphAdmin } from "@/lib/hygraph";
import { gql } from "graphql-request";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, category, eventDate, status } = body;

    const mutation = gql`
      mutation UpdateNewsEvent($id: ID!, $data: NewsEventUpdateInput!) {
        updateNewsEvent(where: { id: $id }, data: $data) {
          id
        }
      }
    `;

    const variables = {
      id,
      data: {
        title,
        content,
        excerpt,
        category,
        eventDate,
        status: status === 'published' ? 'PUBLISHED' : 'DRAFT',
      },
    };

    await hygraphAdmin.request(mutation, variables);

    // If status is published, publish it
    if (status === 'published') {
      const publishMutation = gql`
        mutation PublishNewsEvent($id: ID!) {
          publishNewsEvent(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `;
      await hygraphAdmin.request(publishMutation, { id });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("News PUT error:", error);
    return NextResponse.json({ error: "Failed to update post in Hygraph" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mutation = gql`
      mutation DeleteNewsEvent($id: ID!) {
        deleteNewsEvent(where: { id: $id }) {
          id
        }
      }
    `;

    await hygraphAdmin.request(mutation, { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("News DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete post from Hygraph" }, { status: 500 });
  }
}
