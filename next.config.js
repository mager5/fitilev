/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/fitilev' : '',
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
    swcMinify: true,
    experimental: {
      craCompat: false,
    },
    optimizeFonts: true,
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
  };
  
  module.exports = nextConfig;