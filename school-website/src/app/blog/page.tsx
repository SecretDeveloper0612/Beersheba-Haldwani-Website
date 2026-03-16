import Banner from "@/components/banner";
import { server_query_function } from "@/lib/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  const query = `
    query MyQuery {
      haldwaniBlogs(first: 100) {
        id
        mainImage {
          url
        }
        title
        slug
        shortDesc
      }
    }
    
    `;

  const response = (await server_query_function(query)) as BlogType;

  return (
    <>
      <Banner
        title="Blogs"
        description="Beersheba - Haldwani"
        source="/assets/image/aboutImage.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {response?.haldwaniBlogs.map((blog) => (
          <div className=" bg-white w-72 lg:w-80 mx-auto" key={blog?.id}>
            <Image
              src={blog?.mainImage?.url}
              alt="events"
              width={400}
              height={150}
              className="h-60 w-80"
            />

            <Link href={`/blog/${blog?.slug}`}>
              <h3 className="px-2 py-1 text-[#3B2565] text-2xl font-semibold tracking-tight leading-snug line-clamp-3">
                {blog?.title}
              </h3>
            </Link>

            <p className="px-2 py-1 text-gray-600 line-clamp-4">
              {blog?.shortDesc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
