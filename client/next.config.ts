import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [     
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
    
  },
  // experimental: {
  //   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev','*'],
  // }

  // allowedDevOrigins: [
  //   "http://localhost:3000", // Localhost
  //   "http://192.168.0.119:3000", // Mobile device IP
  // ]
  // devServer: {
  //   Proxy: {
  //     "/": {
  //       target: "http://localhost:8000",
  //       changeOrigin: true
  //     }
  //   }
  // }

  /* config options here */
};
// module.exports = {
//   // allowedDevOrigins: ["*"],
//   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
// }

export default nextConfig;