import { server_query_function } from "@/lib/graphql";
import GalleryClient from "@/components/gallery/GalleryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;


interface ImageGallery {
  heading: string;
  id: string;
  banner: {
    url: string;
  };
}

interface QueryResponse {
  imageGalleries: ImageGallery[];
}

const Page = async () => {
  const query = `query MyQuery {
  imageGalleries (first: 100) {
    heading
    id
    banner {
      url
    }
  }
}`;

  // Fetch data on the server
  const result = (await server_query_function(query)) as QueryResponse;
  const images = result.imageGalleries;

  return (
    <div>
      <div className="container mx-auto p-4">
        <GalleryClient initialImages={images} />
      </div>
    </div>
  );
};

export default Page;
