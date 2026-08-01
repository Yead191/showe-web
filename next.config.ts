import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // The API server (10.10.26.164) is a private IP. Next.js 16 blocks optimizing
    // remote images that resolve to private IPs (SSRF protection), so allow it here.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      {
        protocol: "http",
        hostname: "10.10.26.164",
        port: "5002",
        pathname: "/**",
      },
      { protocol: "http", hostname: "168.144.106.179:3005" },
    ],
  },
};

export default nextConfig;
