import { NextResponse } from 'next/server';

// 블로그 포스트 데이터 (실제로는 별도 파일에서 import)
const blogPosts = [
  {
    id: 1,
    title: "2024년 최고의 영화 10선 - 올해 놓치면 안 될 명작들",
    excerpt: "2024년에 출시된 영화 중에서 관객과 평론가 모두에게 사랑받은 최고의 작품들을 소개합니다. 다양한 장르의 명작들을 만나보세요.",
    author: "영화 평론가 김영화",
    date: "2024-12-15",
    category: "영화 리뷰",
    tags: ["2024년", "최고의 영화", "영화 리뷰", "명작"]
  },
  {
    id: 2,
    title: "영화 장르별 관람 가이드 - 어떤 영화를 선택해야 할까?",
    excerpt: "액션, 로맨스, SF, 공포 등 다양한 영화 장르의 특징과 추천 작품들을 소개하며, 자신에게 맞는 영화를 선택하는 방법을 알려드립니다.",
    author: "영화 큐레이터 박영화",
    date: "2024-12-10",
    category: "영화 가이드",
    tags: ["영화 장르", "관람 가이드", "영화 선택", "추천"]
  },
  {
    id: 3,
    title: "영화관 vs 집에서 보기 - 어떤 선택이 더 좋을까?",
    excerpt: "영화관의 몰입감과 집에서의 편안함, 각각의 장단점을 비교하고 상황에 맞는 최적의 관람 방법을 제안합니다.",
    author: "영화 애호가 이영화",
    date: "2024-12-05",
    category: "영화 팁",
    tags: ["영화관", "집에서 보기", "관람 방법", "비교"]
  },
  {
    id: 4,
    title: "영화 평점 시스템 완벽 가이드 - 어떻게 평점을 매길까?",
    excerpt: "영화 평점의 의미와 기준, 그리고 자신만의 평점 시스템을 만드는 방법을 상세히 설명합니다.",
    author: "영화 리뷰어 최영화",
    date: "2024-11-28",
    category: "영화 팁",
    tags: ["평점", "영화 리뷰", "평가 기준", "가이드"]
  },
  {
    id: 5,
    title: "클래식 영화 추천 - 시대를 초월한 명작들",
    excerpt: "과거의 명작 영화들을 소개하며, 왜 지금도 사랑받는지 그 이유를 설명합니다. 영화사에 길이 남을 걸작들을 만나보세요.",
    author: "영화사학자 정영화",
    date: "2024-11-20",
    category: "클래식 영화",
    tags: ["클래식", "명작", "영화사", "추천"]
  }
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://moviemoa.vercel.app';
  
  const rssItems = blogPosts.map(post => {
    const pubDate = new Date(post.date).toUTCString();
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MOVEA 영화 블로그</title>
    <description>영화에 대한 깊이 있는 이야기와 유용한 정보를 공유하는 블로그입니다.</description>
    <link>${baseUrl}</link>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <managingEditor>noreply@moviemoa.com (MOVEA)</managingEditor>
    <webMaster>noreply@moviemoa.com (MOVEA)</webMaster>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}



