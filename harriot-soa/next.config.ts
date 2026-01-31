import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app', // For the expensive noise texture
      },
      {
        protocol: 'https',
        hostname: 'github.com', // For user avatars
      },
    ],
  },
};

export default nextConfig;