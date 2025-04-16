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
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
        },
      ],
      deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    },
    experimental: {
      // Отключаем оптимизацию CSS, чтобы избежать ошибки с critters
      optimizeCss: false,
      scrollRestoration: true,
      // Отключаем оптимизацию framer-motion из-за проблем с зависимостями
      optimizePackageImports: ['react-icons'],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? {
        exclude: ['error', 'warn'],
      } : false,
    },
    reactStrictMode: false,
    poweredByHeader: false, // Удаляем заголовок X-Powered-By для безопасности и производительности
    webpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimize = true;
        
        // Оптимизируем чанки для лучшей производительности мобильных устройств
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 244000, // Ограничиваем размер бандла для улучшения производительности
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 20,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name(module) {
                if (!module.context) return 'npm.unknown';
                
                const match = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                
                if (!match) return 'npm.unknown';
                
                const packageName = match[1];
                return `npm.${packageName.replace('@', '')}`;
              },
              priority: 10,
            },
          },
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;