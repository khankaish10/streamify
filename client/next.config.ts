import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },

    ],
  },

  /* config options here */
};
// module.exports = {
//   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
// }

export default nextConfig;