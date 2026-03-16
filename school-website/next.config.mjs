/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ap-south-1.graphassets.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/school/Haldwani", // The path you want to redirect from
        destination: "/", // The path you want to redirect to
        permanent: true, // Set to true if the redirect is permanent (301), or false for a temporary redirect (302)
      },
    ];
  },
};

export default nextConfig;
