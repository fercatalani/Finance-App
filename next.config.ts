import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // During local development, proxy /api/* requests to the local Express server
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:4000/api/:path*",
        },
      ];
    }
    return [];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
