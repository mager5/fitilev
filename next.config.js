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
      deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    swcMinify: true,
    experimental: {
      craCompat: false,
      optimizeCss: true,
      scrollRestoration: true,
      optimizePackageImports: ['framer-motion', 'react-icons'],
      modularizeImports: {
        'react-icons/?(((\\w*)?/?)*)': {
          transform: 'react-icons/{{matches.[1]}}/{{member}}',
        },
      },
    },
    optimizeFonts: true,
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production' ? {
        exclude: ['error', 'warn'],
      } : false,
    },
    minify: true,
    reactStrictMode: false,
    webpack: (config) => {
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimize = true;
        
        // Оптимизируем чанки
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
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
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
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