/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        port: '',
        pathname: '/**',
      },
      // Add other domains if needed
      // {
      //   protocol: 'https',
      //   hostname: 'cdn4.iconfinder.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    rules: {
      '*.mp4': {
        type: 'asset',
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
