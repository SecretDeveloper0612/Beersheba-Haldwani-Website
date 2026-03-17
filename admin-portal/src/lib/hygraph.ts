import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

if (!endpoint) {
  throw new Error('HYGRAPH_ENDPOINT is not defined in environment variables');
}

// Public client for read-only operations (if needed without token)
export const hygraph = new GraphQLClient(endpoint);

// Admin client for CRUD operations with permanent auth token
export const hygraphAdmin = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default hygraphAdmin;
