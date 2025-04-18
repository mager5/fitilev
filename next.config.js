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
    // Используем правильный префикс для асcетов и базовый путь 
    // только в production режиме (если не локальная разработка)
    ...(process.env.NODE_ENV === 'production' ? {
      // Для работы на GitHub Pages
      assetPrefix: './',
      basePath: '',
    } : {}),
  };
  
  module.exports = nextConfig;