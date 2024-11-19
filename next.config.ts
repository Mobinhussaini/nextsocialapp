import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: true, 
  },
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "images.pexels.com"
      },
      {
        protocol: 'https',
        hostname: "avatars.githubusercontent.com"
      }      ,
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname:"res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
