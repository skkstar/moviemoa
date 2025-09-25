import Link from "next/link";
import { Calendar, User, ArrowRight, Film, Star, Clock, TrendingUp } from "lucide-react";

// 정적 블로그 포스트 데이터
const blogPosts = [
  {
    id: 1,
    title: "2024년 최고의 영화 10선 - 올해 놓치면 안 될 명작들",
    excerpt: "2024년에 출시된 영화 중에서 관객과 평론가 모두에게 사랑받은 최고의 작품들을 소개합니다. 다양한 장르의 명작들을 만나보세요.",
    content: `
      <h2>2024년 최고의 영화 10선</h2>
      <p>2024년은 영화계에 있어서 특별한 해였습니다. 다양한 장르에서 뛰어난 작품들이 출시되었고, 관객들에게 깊은 인상을 남겼습니다.</p>
      
      <h3>1. 오펜하이머</h3>
      <p>크리스토퍼 놀란 감독의 걸작으로, 원자폭탄 개발의 아버지라고 불리는 로버트 오펜하이머의 이야기를 담고 있습니다. 복잡한 시간 구조와 강력한 연출로 관객들을 사로잡았습니다.</p>
      
      <h3>2. 바비</h3>
      <p>그레타 거윅 감독의 바비는 단순한 상업 영화를 넘어서 페미니즘과 현대 사회에 대한 날카로운 통찰을 제공합니다. 마고 로비의 뛰어난 연기와 화려한 시각적 연출이 돋보입니다.</p>
      
      <h3>3. 킬러스 오브 더 플라워 문</h3>
      <p>마틴 스코세이지 감독의 서부극으로, 1920년대 오클라호마에서 벌어진 실제 사건을 바탕으로 한 작품입니다. 레오나르도 디카프리오와 로버트 드 니로의 완벽한 연기가 인상적입니다.</p>
      
      <p>이러한 작품들은 단순히 오락을 넘어서 예술적 가치와 사회적 메시지를 담고 있어 2024년을 대표하는 명작으로 평가받고 있습니다.</p>
    `,
    author: "영화 평론가 김영화",
    date: "2024-12-15",
    readTime: "8분",
    category: "영화 리뷰",
    tags: ["2024년", "최고의 영화", "영화 리뷰", "명작"],
    featured: true
  },
  {
    id: 2,
    title: "영화 장르별 관람 가이드 - 어떤 영화를 선택해야 할까?",
    excerpt: "액션, 로맨스, SF, 공포 등 다양한 영화 장르의 특징과 추천 작품들을 소개하며, 자신에게 맞는 영화를 선택하는 방법을 알려드립니다.",
    content: `
      <h2>영화 장르별 특징과 선택 가이드</h2>
      <p>영화를 선택할 때 가장 중요한 것은 자신의 취향과 현재 기분에 맞는 장르를 선택하는 것입니다.</p>
      
      <h3>액션 영화</h3>
      <p>스릴 넘치는 추격전과 격투 장면이 특징인 액션 영화는 짜릿한 카타르시스를 원하는 관객들에게 추천합니다. 마블 시네마틱 유니버스, 미션 임파서블 시리즈 등이 대표적입니다.</p>
      
      <h3>로맨스 영화</h3>
      <p>사랑과 감정을 주제로 한 로맨스 영화는 따뜻한 감동을 원하는 관객들에게 좋습니다. 노트북, 라라랜드, 어바웃 타임 등이 감동적인 스토리로 유명합니다.</p>
      
      <h3>SF 영화</h3>
      <p>과학과 기술을 바탕으로 한 SF 영화는 상상력과 철학적 사고를 자극합니다. 인터스텔라, 블레이드 러너, 매트릭스 등은 SF 장르의 걸작으로 평가받습니다.</p>
      
      <h3>공포 영화</h3>
      <p>긴장감과 스릴을 원하는 관객들에게는 공포 영화가 적합합니다. 하지만 심장이 약한 분들은 주의하세요!</p>
      
      <p>각 장르의 특징을 이해하고 자신의 취향에 맞는 영화를 선택한다면 더욱 즐거운 관람 경험을 할 수 있을 것입니다.</p>
    `,
    author: "영화 큐레이터 박영화",
    date: "2024-12-10",
    readTime: "6분",
    category: "영화 가이드",
    tags: ["영화 장르", "관람 가이드", "영화 선택", "추천"],
    featured: true
  },
  {
    id: 3,
    title: "영화관 vs 집에서 보기 - 어떤 선택이 더 좋을까?",
    excerpt: "영화관의 몰입감과 집에서의 편안함, 각각의 장단점을 비교하고 상황에 맞는 최적의 관람 방법을 제안합니다.",
    content: `
      <h2>영화관 vs 집에서 보기 비교</h2>
      <p>영화를 보는 방법에는 크게 영화관에서 보는 것과 집에서 보는 것이 있습니다. 각각의 장단점을 알아보겠습니다.</p>
      
      <h3>영화관의 장점</h3>
      <ul>
        <li><strong>몰입감:</strong> 큰 스크린과 강력한 사운드로 완전한 몰입이 가능합니다.</li>
        <li><strong>집중력:</strong> 다른 방해 요소 없이 영화에만 집중할 수 있습니다.</li>
        <li><strong>사회적 경험:</strong> 함께 관람하는 관객들과의 공감대 형성</li>
        <li><strong>최신작:</strong> 가장 빠른 시기에 최신 영화를 감상할 수 있습니다.</li>
      </ul>
      
      <h3>집에서 보기의 장점</h3>
      <ul>
        <li><strong>편안함:</strong> 자신만의 공간에서 편안하게 감상</li>
        <li><strong>경제성:</strong> 영화관보다 저렴한 비용</li>
        <li><strong>자유도:</strong> 언제든지 일시정지하고 재개 가능</li>
        <li><strong>반복 감상:</strong> 좋아하는 장면을 반복해서 볼 수 있음</li>
      </ul>
      
      <h3>상황별 추천</h3>
      <p><strong>영화관 추천:</strong> 액션 영화, SF 영화, 시각적 효과가 뛰어난 영화</p>
      <p><strong>집에서 추천:</strong> 로맨스 영화, 코미디 영화, 가족 영화</p>
      
      <p>결국 자신의 상황과 취향에 맞는 방법을 선택하는 것이 가장 중요합니다.</p>
    `,
    author: "영화 애호가 이영화",
    date: "2024-12-05",
    readTime: "5분",
    category: "영화 팁",
    tags: ["영화관", "집에서 보기", "관람 방법", "비교"],
    featured: false
  },
  {
    id: 4,
    title: "영화 평점 시스템 완벽 가이드 - 어떻게 평점을 매길까?",
    excerpt: "영화 평점의 의미와 기준, 그리고 자신만의 평점 시스템을 만드는 방법을 상세히 설명합니다.",
    content: `
      <h2>영화 평점 시스템 완벽 가이드</h2>
      <p>영화를 보고 나서 평점을 매기는 것은 자신의 감상 기록과 다른 사람들과의 소통을 위한 좋은 방법입니다.</p>
      
      <h3>일반적인 평점 기준</h3>
      <ul>
        <li><strong>5점 (완벽):</strong> 모든 면에서 완벽한 명작</li>
        <li><strong>4점 (매우 좋음):</strong> 대부분 훌륭하지만 약간의 아쉬움이 있음</li>
        <li><strong>3점 (보통):</strong> 괜찮지만 특별하지는 않음</li>
        <li><strong>2점 (아쉬움):</strong> 기대에 못 미치는 작품</li>
        <li><strong>1점 (실망):</strong> 전혀 추천하지 않을 작품</li>
      </ul>
      
      <h3>평점 매기는 기준</h3>
      <p>평점을 매길 때는 다음과 같은 요소들을 고려해보세요:</p>
      <ul>
        <li><strong>스토리:</strong> 줄거리의 흥미도와 논리성</li>
        <li><strong>연기:</strong> 배우들의 연기력</li>
        <li><strong>연출:</strong> 감독의 연출력과 영상미</li>
        <li><strong>음악:</strong> 영화 분위기에 맞는 음악</li>
        <li><strong>전체적 만족도:</strong> 개인적인 감동과 재미</li>
      </ul>
      
      <h3>자신만의 평점 시스템 만들기</h3>
      <p>기존의 5점 만점 시스템 외에도 다음과 같은 방법들을 시도해볼 수 있습니다:</p>
      <ul>
        <li>10점 만점 시스템</li>
        <li>A, B, C, D, F 등급 시스템</li>
        <li>별점 시스템 (⭐⭐⭐⭐⭐)</li>
        <li>감정 기반 평점 (😍😊😐😞😢)</li>
      </ul>
      
      <p>가장 중요한 것은 일관된 기준으로 평점을 매기는 것입니다. 이를 통해 자신의 영화 취향을 더 잘 파악할 수 있고, 다른 사람들에게도 유용한 정보를 제공할 수 있습니다.</p>
    `,
    author: "영화 리뷰어 최영화",
    date: "2024-11-28",
    readTime: "7분",
    category: "영화 팁",
    tags: ["평점", "영화 리뷰", "평가 기준", "가이드"],
    featured: false
  },
  {
    id: 5,
    title: "클래식 영화 추천 - 시대를 초월한 명작들",
    excerpt: "과거의 명작 영화들을 소개하며, 왜 지금도 사랑받는지 그 이유를 설명합니다. 영화사에 길이 남을 걸작들을 만나보세요.",
    content: `
      <h2>시대를 초월한 클래식 영화들</h2>
      <p>시간이 흘러도 변하지 않는 가치를 지닌 클래식 영화들은 지금 봐도 충분히 감동적이고 의미 있는 작품들입니다.</p>
      
      <h3>할리우드 클래식</h3>
      <ul>
        <li><strong>시티라이트 (1931):</strong> 찰리 채플린의 걸작으로, 무성영화 시대의 마지막 명작</li>
        <li><strong>카사블랑카 (1942):</strong> 전쟁 중의 사랑 이야기로 로맨스 영화의 교과서</li>
        <li><strong>시민 케인 (1941):</strong> 영화사상 가장 위대한 작품으로 평가받는 오슨 웰스의 걸작</li>
        <li><strong>아버지와 아들 (1972):</strong> 프랜시스 포드 코폴라의 대작으로 마피아 영화의 원형</li>
      </ul>
      
      <h3>유럽 영화</h3>
      <ul>
        <li><strong>8과 1/2 (1963):</strong> 페데리코 펠리니의 자전적 작품으로 영화 속 영화</li>
        <li><strong>400번의 구타 (1959):</strong> 프랑스 누벨바그의 대표작</li>
        <li><strong>안드레이 루블레프 (1966):</strong> 안드레이 타르코프스키의 영화 예술의 정수</li>
      </ul>
      
      <h3>아시아 영화</h3>
      <ul>
        <li><strong>도쿄 이야기 (1953):</strong> 오즈 야스지로의 가족 드라마</li>
        <li><strong>춘향전 (1955):</strong> 한국 영화사의 고전</li>
        <li><strong>화양연화 (2000):</strong> 왕가위의 아름다운 연출이 돋보이는 작품</li>
      </ul>
      
      <h3>클래식 영화를 보는 이유</h3>
      <p>클래식 영화는 단순히 과거의 작품이 아닙니다. 현대 영화의 기반이 되고, 영화 언어의 발전 과정을 보여주는 중요한 자료입니다. 또한 시대를 초월한 인간의 보편적 감정과 상황을 담고 있어 지금 봐도 충분히 공감할 수 있습니다.</p>
      
      <p>영화를 진정으로 사랑한다면, 이런 클래식 작품들을 통해 영화의 역사와 발전 과정을 이해하는 것이 중요합니다.</p>
    `,
    author: "영화사학자 정영화",
    date: "2024-11-20",
    readTime: "9분",
    category: "클래식 영화",
    tags: ["클래식", "명작", "영화사", "추천"],
    featured: true
  }
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' }}></div>
            <h1 className="text-5xl font-bold text-white">영화 블로그</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            영화에 대한 깊이 있는 이야기와 유용한 정보를 공유합니다
          </p>
        </div>

        {/* 피처드 포스트 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" />
            추천 포스트
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{post.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>자세히 보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 일반 포스트 */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <Film className="w-8 h-8 text-blue-400" />
            최신 포스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    <span>보기</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SEO 최적화를 위한 추가 정보 */}
        <section className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">영화 블로그에서 찾을 수 있는 것들</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">최신 트렌드</h3>
              <p className="text-gray-300 text-sm">영화계의 최신 동향과 트렌드를 분석합니다</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">명작 리뷰</h3>
              <p className="text-gray-300 text-sm">시대를 초월한 명작들을 깊이 있게 분석합니다</p>
            </div>
            <div className="text-center">
              <Film className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">관람 가이드</h3>
              <p className="text-gray-300 text-sm">더 나은 영화 관람을 위한 실용적인 팁을 제공합니다</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}




