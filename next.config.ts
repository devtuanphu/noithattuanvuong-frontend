import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable scroll restoration and view transitions to prevent scroll animation on navigation
    scrollRestoration: false,
    viewTransition: false,
  },
  images: {
    // Allow unoptimized images in development to bypass private IP restriction
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.noithattuanvuong.vn',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

