import "@/lib/node-polyfill";
import { GraphQLClient, request } from "graphql-request";

const headers = {
  Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
};

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT!);

export async function server_query_function(query: any) {
  const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (!endpoint) {
    console.error("❌ NEXT_PUBLIC_HYGRAPH_ENDPOINT is missing in .env");
    throw new Error("Hygraph endpoint is not configured");
  }

  try {
    const response = await request(
      endpoint,
      query,
      {
        headers,
      }
    );

    return response;
  } catch (error: any) {
    if (error.name === "AbortError" || error.name === "TimeoutError") {
      console.error("⏱️ Hygraph request timed out. Please check your internet connection or the Hygraph service status.");
    }
    console.log("❌ Hygraph Error:", error.message || error);
    throw new Error(`Failed to fetch: ${error.message || "Unknown error"}`);
  }
}

export async function client_query_function(query: any) {
  try {
    const response = await hygraph.request(query, {
      headers,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(`${error.message}`);
    } else {
      throw new Error("Failed to fetch");
    }
  }
}
