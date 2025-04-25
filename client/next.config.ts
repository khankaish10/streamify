import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'res.cloudinary.com',
    //     port: '',
    //     pathname: 'upload/**',
    //     search: '',
    //   },

    // ],
  },

  /* config options here */
};
// module.exports = {
//   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
// }

export default nextConfig;