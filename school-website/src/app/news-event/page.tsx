import Banner from "@/components/banner";
import Heading3 from "@/components/heading3";
import { query } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = async () => {
  const newsEvents = (await query(
    "SELECT * FROM news_events WHERE status = 'published' ORDER BY created_at DESC"
  )) as any[];

  const mappedNews = newsEvents?.map(item => ({
    id: item.id,
    newsHeading: item.title,
    newsImage: { url: item.featured_image || "/assets/image/placeholder.jpg" }
  })) || [];

  return (
    <div>
      <Banner
        title="News & Events"
        description="Latest updates from Beersheba Schools"
        source="/assets/image/aboutImage.jpg"
      />
      
      <div className="container mx-auto p-4 lg:p-10 mb-20">
        <Heading3 title="Latest Announcements" />
        
        <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mappedNews.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold">
              No news or events found.
            </div>
          ) : (
            mappedNews.map((item) => (
              <Link href={`/news-event/${item?.id}`} key={item?.id}>
                <div
                  className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="relative overflow-hidden h-64">
                    <Image
                      src={item?.newsImage.url}
                      alt={item?.newsHeading}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#3B2565] line-clamp-2">
                      {item?.newsHeading}
                    </h2>
                    <div className="mt-4 flex items-center text-indigo-600 font-bold text-sm">
                      Read More 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
