import { query } from "@/lib/db";
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
  
  const newsEventRes = (await query(
    "SELECT * FROM news_events WHERE id = ? LIMIT 1",
    [params.id]
  )) as any[];

  const newsEvent = newsEventRes[0];

  if (!newsEvent) {
    return <div className="p-20 text-center font-bold text-gray-400">News event not found</div>;
  }

  return (
    <>
      <Banner 
        title={newsEvent.title}
        description={newsEvent.category}
        source={newsEvent.featured_image || "/assets/image/aboutImage.jpg"}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-gray-50">
          <div className="relative h-[25rem] lg:h-[35rem]">
            <Image
              src={newsEvent.featured_image || "/assets/image/placeholder.jpg"}
              alt={newsEvent.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black text-[#3B2565] uppercase tracking-widest shadow-xl">
                {newsEvent.category}
              </span>
            </div>
          </div>
          
          <div className="p-8 lg:p-16">
            <div className="flex items-center gap-4 mb-6 text-gray-400 font-bold text-sm uppercase tracking-widest">
              <span>{new Date(newsEvent.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              <span>{newsEvent.event_location || "Main Campus"}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-[#3B2565] mb-10 leading-tight">
              {newsEvent.title}
            </h1>
            
            <div
              className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: newsEvent.content || "" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
