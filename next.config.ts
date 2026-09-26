import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ],
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.0.104', 'localhost:3000'],
};

export default nextConfig;
