import { server_query_function } from "@/lib/graphql";
import Image from "next/image";
import React from "react";
import Banner from "@/components/banner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async (
  props: {
    params: Promise<{
      id: string;
    }>;
  }
) => {
  const params = await props.params;

  const query = `query MyQuery {
    newsEvent(where: {id: "${params.id}"}) {
      id
      newsHeading
      newsImage {
        url
      }
      newsDesc {
        html
      }
      createdAt
    }
  }`;

  try {
    const response = (await server_query_function(query)) as any;
    const newsEvent = response?.newsEvent;


    if (!newsEvent) {
      return <div className="p-20 text-center font-bold text-gray-400">News event not found</div>;
    }

    return (
      <>
        <Banner 
          title={newsEvent.newsHeading}
          description="News & Events"
          source={newsEvent.newsImage?.url || "/assets/image/aboutImage.jpg"}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-gray-50">
            <div className="relative h-[25rem] lg:h-[35rem]">
              <Image
                src={newsEvent.newsImage?.url || "/assets/image/placeholder.jpg"}
                alt={newsEvent.newsHeading}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            <div className="p-8 lg:p-16">
              <div className="flex items-center gap-4 mb-6 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <span>{new Date(newsEvent.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black text-[#3B2565] mb-10 leading-tight">
                {newsEvent.newsHeading}
              </h1>
              
              <div
                className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: newsEvent.newsDesc?.html || "" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching news detail from Hygraph:", error);
    return <div className="p-20 text-center font-bold text-red-500">Error loading news event</div>;
  }
};

export default page;
