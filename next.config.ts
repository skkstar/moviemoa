import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 배포를 위한 설정
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 저장소 이름을 기반으로 한 base path 설정
  basePath: process.env.NODE_ENV === 'production' ? '/figma_plugin' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/figma_plugin' : '',
};

export default nextConfig;
