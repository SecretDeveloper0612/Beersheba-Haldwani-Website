import "@/lib/node-polyfill";
import { GraphQLClient, request } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!endpoint) {
  throw new Error("NEXT_PUBLIC_HYGRAPH_ENDPOINT is missing in .env");
}

// Public client for client-side and public-read server-side queries
const hygraphPublic = new GraphQLClient(endpoint);

/**
 * Server-only query function.
 * Use this for data fetching in Server Components.
 * If a token is provided in .env, it will be used for authenticated read.
 */
export async function server_query_function(query: any, variables?: any) {
  const token = process.env.HYGRAPH_TOKEN;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  try {
    const response = await request(endpoint!, query, variables, headers);
    return response;
  } catch (error: any) {
    console.error("❌ Hygraph Server Error:", error.message || error);
    throw new Error(`Failed to fetch from Hygraph: ${error.message || "Unknown error"}`);
  }
}

/**
 * Client-side query function.
 * This does NOT use the admin token to prevent exposure.
 */
export async function client_query_function(query: any, variables?: any) {
  try {
    const response = await hygraphPublic.request(query, variables);
    return response;
  } catch (error: any) {
    console.error("❌ Hygraph Client Error:", error.message || error);
    throw new Error("Failed to fetch data. Check project public permissions.");
  }
}
