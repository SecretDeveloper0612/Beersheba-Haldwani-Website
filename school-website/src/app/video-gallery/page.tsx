import { server_query_function } from "@/lib/graphql";
import VideoGrid from "@/components/video/VideoGrid";

// Server component
async function Page() {
  const query = `
    query MyQuery {
      haldwaniVideoGalleries {
        haldwaniVideo {
          id
          url
        }
      }
    }
  `;

  // Define the expected data structure
  interface VideoData {
    haldwaniVideoGalleries?: Array<{
      haldwaniVideo?: {
        id: string;
        url: string[];
      };
    }>;
  }

  // Fetch data server-side
  const data = (await server_query_function(query)) as VideoData;
  const videos = data?.haldwaniVideoGalleries?.[0]?.haldwaniVideo?.url || [];

  // Use client component for the interactive parts
  return <VideoGrid videos={videos} />;
}

export default Page;
