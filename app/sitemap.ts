import { MetadataRoute } from 'next';

// 假设这是你的线上域名
const BASE_URL = 'https://pardusa.com'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 静态页面
  const staticRoutes = [
    '',
    '/about',
    '/support',
    '/products',
    '/blog',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. 动态页面 (可选：如果你想从 WordPress 获取所有文章链接)
  // const posts = await getAllPosts(); 
  // const dynamicRoutes = posts.map(...)

  return [
    ...staticRoutes,
    // ...dynamicRoutes
  ];
}