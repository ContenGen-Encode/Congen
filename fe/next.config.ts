import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "cdn.revid.ai"
      }
    ]
  }
};

export default nextConfig;
