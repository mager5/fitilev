/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
    typescript: {
      // ⚠️ Опасно! Игнорировать ошибки TypeScript при сборке
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;