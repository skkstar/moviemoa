import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://moviemoa.vercel.app'
  
  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-movies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // 블로그 포스트들
  const blogPosts = [
    {
      id: 1,
      title: "2024년 최고의 영화 10선 - 올해 놓치면 안 될 명작들",
      date: "2024-12-15",
    },
    {
      id: 2,
      title: "영화 장르별 관람 가이드 - 어떤 영화를 선택해야 할까?",
      date: "2024-12-10",
    },
    {
      id: 3,
      title: "영화관 vs 집에서 보기 - 어떤 선택이 더 좋을까?",
      date: "2024-12-05",
    },
    {
      id: 4,
      title: "영화 평점 시스템 완벽 가이드 - 어떻게 평점을 매길까?",
      date: "2024-11-28",
    },
    {
      id: 5,
      title: "클래식 영화 추천 - 시대를 초월한 명작들",
      date: "2024-11-20",
    },
  ]

  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages]
}

