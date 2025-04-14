   /** @type {import('next').NextConfig} */
   const nextConfig = {
    output: 'export',
    basePath: '/fitilev',
    assetPrefix: '/fitilev/',
    trailingSlash: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;