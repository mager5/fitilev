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
    // Используем правильный префикс для ассетов и базовый путь 
    // только в production режиме (если не локальная разработка)
    ...(process.env.NODE_ENV === 'production' ? {
      // Для работы на GitHub Pages используем пустой префикс
      // (по умолчанию Next.js уже использует / как префикс)
      assetPrefix: '',
      basePath: '',
    } : {}),
  };
  
  module.exports = nextConfig;