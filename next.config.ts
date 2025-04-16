import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // Các request bắt đầu bằng /api/
  //       destination: 'https://your-node-app.onrender.com/api/:path*', // URL của Node.js trên Render
  //     },
  //   ];
  // },
};

export default nextConfig;
