import { server_query_function } from "@/lib/graphql";
import { gql } from "graphql-request";
import Image from "next/image";
import React from "react";

export const dynamic = "force-dynamic";

const page = async (
  props: {
    params: Promise<{
      slug: string;
    }>;
  }
) => {
  const params = await props.params;
  const query = gql`
    query MyQuery {
      haldwaniBlogs(where: { slug: "${params.slug}" }) {
        id
        mainImage {
          url
        }
        title
        shortDesc
        content {
          html
        }
      }
    }
  `;

  const response = (await server_query_function(query)) as SingleBlogType;
  const blog = response.haldwaniBlogs[0];

  if (!blog) {
    return <div className="p-10 text-center">Blog post not found</div>;
  }

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Image
          width={1200}
          height={500}
          src={response.haldwaniBlogs[0]?.mainImage.url}
          alt="banner"
          className="h-80 w-full object-cover object-center"
          unoptimized
        />

        <h1 className="text-3xl font-bold mt-6">
          {response.haldwaniBlogs[0]?.title}
        </h1>

        <div
          className="mt-6"
          dangerouslySetInnerHTML={{
            __html: response.haldwaniBlogs[0]?.content?.html,
          }}
        />
      </section>
    </>
  );
};

export default page;
