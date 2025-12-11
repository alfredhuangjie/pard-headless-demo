import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 👇【核心代码】只要是开发环境，就不走服务器优化，直接让浏览器加载
    unoptimized: process.env.NODE_ENV === 'development',

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'founderblog.exongear.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;