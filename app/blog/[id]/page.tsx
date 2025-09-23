import Link from "next/link";
import { Calendar, User, ArrowLeft, Clock, Film, Star } from "lucide-react";

// 정적 블로그 포스트 데이터 (실제로는 별도 파일에서 import)
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
      
      <h3>4. 아바타: 물의 길</h3>
      <p>제임스 카메론 감독의 아바타 시리즈의 두 번째 작품으로, 놀라운 시각적 효과와 깊이 있는 환경 메시지가 돋보입니다.</p>
      
      <h3>5. 스파이더맨: 어크로스 더 유니버스</h3>
      <p>애니메이션 영화의 새로운 지평을 열었던 작품으로, 독창적인 시각 스타일과 감동적인 스토리가 완벽하게 조화를 이룹니다.</p>
      
      <h3>6. 존 윅 4</h3>
      <p>키아누 리브스 주연의 액션 시리즈의 완결편으로, 혁신적인 액션 연출과 시각적 임팩트가 압권입니다.</p>
      
      <h3>7. 가디언즈 오브 갤럭시: Volume 3</h3>
      <p>마블 시네마틱 유니버스의 가디언즈 오브 갤럭시 시리즈의 마지막 작품으로, 감정적 깊이와 액션의 완벽한 균형을 보여줍니다.</p>
      
      <h3>8. 인디아나 존스: 운명의 다이얼</h3>
      <p>고전 모험 영화 시리즈의 마지막 작품으로, 해리슨 포드의 마지막 인디아나 존스를 볼 수 있는 감동적인 작품입니다.</p>
      
      <h3>9. 미션 임파서블: 데드 레코닝</h3>
      <p>톰 크루즈의 대표작 시리즈의 새로운 편으로, 실사 스턴트와 긴장감 넘치는 액션이 여전히 관객들을 사로잡습니다.</p>
      
      <h3>10. 더 마블스</h3>
      <p>마블의 새로운 슈퍼히어로 영화로, 다양한 캐릭터들의 팀워크와 개성 넘치는 연기가 돋보입니다.</p>
      
      <h2>2024년 영화계의 특징</h2>
      <p>2024년 영화계는 다음과 같은 특징을 보였습니다:</p>
      <ul>
        <li><strong>다양성의 확장:</strong> 다양한 장르와 스타일의 영화들이 균형있게 출시</li>
        <li><strong>기술의 발전:</strong> 더욱 발전된 시각 효과와 촬영 기술</li>
        <li><strong>스토리텔링의 진화:</strong> 복잡하고 깊이 있는 내러티브 구조</li>
        <li><strong>글로벌 콘텐츠:</strong> 다양한 문화권의 작품들이 주목받음</li>
      </ul>
      
      <p>이러한 작품들은 단순히 오락을 넘어서 예술적 가치와 사회적 메시지를 담고 있어 2024년을 대표하는 명작으로 평가받고 있습니다. 각각의 작품은 고유한 매력과 가치를 지니고 있으며, 영화 애호가들에게 깊은 감동과 여운을 남겼습니다.</p>
    `,
    author: "영화 평론가 김영화",
    date: "2024-12-15",
    readTime: "8분",
    category: "영화 리뷰",
    tags: ["2024년", "최고의 영화", "영화 리뷰", "명작"]
  },
  {
    id: 2,
    title: "영화 장르별 관람 가이드 - 어떤 영화를 선택해야 할까?",
    excerpt: "액션, 로맨스, SF, 공포 등 다양한 영화 장르의 특징과 추천 작품들을 소개하며, 자신에게 맞는 영화를 선택하는 방법을 알려드립니다.",
    content: `
      <h2>영화 장르별 특징과 선택 가이드</h2>
      <p>영화를 선택할 때 가장 중요한 것은 자신의 취향과 현재 기분에 맞는 장르를 선택하는 것입니다. 각 장르별로 특징과 추천 작품을 알아보겠습니다.</p>
      
      <h3>액션 영화</h3>
      <p>스릴 넘치는 추격전과 격투 장면이 특징인 액션 영화는 짜릿한 카타르시스를 원하는 관객들에게 추천합니다.</p>
      <ul>
        <li><strong>특징:</strong> 빠른 속도의 편집, 임팩트 있는 액션 시퀀스</li>
        <li><strong>추천 작품:</strong> 마블 시네마틱 유니버스, 미션 임파서블 시리즈, 존 윅 시리즈</li>
        <li><strong>관람 팁:</strong> 큰 스크린과 강력한 사운드가 있는 영화관에서 보는 것을 추천</li>
      </ul>
      
      <h3>로맨스 영화</h3>
      <p>사랑과 감정을 주제로 한 로맨스 영화는 따뜻한 감동을 원하는 관객들에게 좋습니다.</p>
      <ul>
        <li><strong>특징:</strong> 감정적 몰입, 캐릭터 간의 화학 반응</li>
        <li><strong>추천 작품:</strong> 노트북, 라라랜드, 어바웃 타임, 내가 사랑한 모든 남자들에게</li>
        <li><strong>관람 팁:</strong> 연인이나 친구와 함께 보면 더욱 즐거운 경험</li>
      </ul>
      
      <h3>SF 영화</h3>
      <p>과학과 기술을 바탕으로 한 SF 영화는 상상력과 철학적 사고를 자극합니다.</p>
      <ul>
        <li><strong>특징:</strong> 미래적 상상력, 철학적 메시지, 첨단 기술</li>
        <li><strong>추천 작품:</strong> 인터스텔라, 블레이드 러너, 매트릭스, 어벤져스 시리즈</li>
        <li><strong>관람 팁:</strong> 집중해서 봐야 복잡한 설정을 이해할 수 있음</li>
      </ul>
      
      <h3>공포 영화</h3>
      <p>긴장감과 스릴을 원하는 관객들에게는 공포 영화가 적합합니다.</p>
      <ul>
        <li><strong>특징:</strong> 긴장감, 스릴, 심리적 압박감</li>
        <li><strong>추천 작품:</strong> 컨저링, 어나더, 헤레디터리</li>
        <li><strong>관람 팁:</strong> 심장이 약한 분들은 주의하세요!</li>
      </ul>
      
      <h3>코미디 영화</h3>
      <p>웃음과 즐거움을 원할 때 선택하는 장르입니다.</p>
      <ul>
        <li><strong>특징:</strong> 유머, 재미, 가벼운 분위기</li>
        <li><strong>추천 작품:</strong> 슈퍼배드, 미니언즈, 데드풀</li>
        <li><strong>관람 팁:</strong> 가족이나 친구들과 함께 보면 더욱 재미있음</li>
      </ul>
      
      <h3>드라마 영화</h3>
      <p>깊이 있는 스토리와 연기를 원하는 관객들에게 적합합니다.</p>
      <ul>
        <li><strong>특징:</strong> 복잡한 캐릭터, 깊이 있는 스토리</li>
        <li><strong>추천 작품:</strong> 포레스트 검프, 그린 마일, 샤인</li>
        <li><strong>관람 팁:</strong> 집중해서 봐야 스토리의 깊이를 느낄 수 있음</li>
      </ul>
      
      <h2>상황별 영화 선택 가이드</h2>
      <ul>
        <li><strong>데이트:</strong> 로맨스, 코미디</li>
        <li><strong>가족 모임:</strong> 가족 영화, 애니메이션</li>
        <li><strong>친구들과:</strong> 액션, 코미디, 공포</li>
        <li><strong>혼자:</strong> 드라마, SF, 다큐멘터리</li>
        <li><strong>스트레스 해소:</strong> 코미디, 액션</li>
      </ul>
      
      <p>각 장르의 특징을 이해하고 자신의 취향에 맞는 영화를 선택한다면 더욱 즐거운 관람 경험을 할 수 있을 것입니다. 또한 다양한 장르를 시도해보는 것도 영화의 새로운 매력을 발견하는 좋은 방법입니다.</p>
    `,
    author: "영화 큐레이터 박영화",
    date: "2024-12-10",
    readTime: "6분",
    category: "영화 가이드",
    tags: ["영화 장르", "관람 가이드", "영화 선택", "추천"]
  },
  {
    id: 3,
    title: "영화관 vs 집에서 보기 - 어떤 선택이 더 좋을까?",
    excerpt: "영화관의 몰입감과 집에서의 편안함, 각각의 장단점을 비교하고 상황에 맞는 최적의 관람 방법을 제안합니다.",
    content: `
      <h2>영화관 vs 집에서 보기 비교</h2>
      <p>영화를 보는 방법에는 크게 영화관에서 보는 것과 집에서 보는 것이 있습니다. 각각의 장단점을 자세히 알아보겠습니다.</p>
      
      <h3>영화관의 장점</h3>
      <ul>
        <li><strong>몰입감:</strong> 큰 스크린과 강력한 사운드로 완전한 몰입이 가능합니다. 특히 IMAX나 4DX 같은 특별관에서는 더욱 강렬한 경험을 할 수 있습니다.</li>
        <li><strong>집중력:</strong> 다른 방해 요소 없이 영화에만 집중할 수 있습니다. 집에서는 전화, 메시지, 가족의 방해 등이 있을 수 있지만 영화관에서는 그런 일이 없습니다.</li>
        <li><strong>사회적 경험:</strong> 함께 관람하는 관객들과의 공감대 형성. 웃음이나 긴장감을 함께 나누는 경험은 집에서 보는 것과는 다른 특별한 매력이 있습니다.</li>
        <li><strong>최신작:</strong> 가장 빠른 시기에 최신 영화를 감상할 수 있습니다. OTT 서비스보다 훨씬 빨리 볼 수 있습니다.</li>
        <li><strong>시각적 효과:</strong> 3D, IMAX, 4DX 등 집에서는 경험할 수 없는 특별한 시각 효과를 즐길 수 있습니다.</li>
      </ul>
      
      <h3>영화관의 단점</h3>
      <ul>
        <li><strong>비용:</strong> 티켓 가격이 상당히 비쌉니다. 특히 특별관은 더욱 비싸며, 팝콘이나 음료까지 포함하면 상당한 비용이 듭니다.</li>
        <li><strong>시간 제약:</strong> 상영 시간에 맞춰 가야 하며, 늦으면 영화를 놓칠 수 있습니다.</li>
        <li><strong>불편함:</strong> 다른 관객들의 소음이나 냄새 등이 방해가 될 수 있습니다.</li>
        <li><strong>이동 시간:</strong> 영화관까지 가는 시간과 비용이 추가로 듭니다.</li>
      </ul>
      
      <h3>집에서 보기의 장점</h3>
      <ul>
        <li><strong>편안함:</strong> 자신만의 공간에서 편안하게 감상할 수 있습니다. 소파에 누워서 보거나 원하는 자세로 볼 수 있습니다.</li>
        <li><strong>경제성:</strong> 영화관보다 저렴한 비용. OTT 서비스 월 구독료로 여러 영화를 볼 수 있습니다.</li>
        <li><strong>자유도:</strong> 언제든지 일시정지하고 재개할 수 있으며, 화장실을 가거나 간식을 먹을 수 있습니다.</li>
        <li><strong>반복 감상:</strong> 좋아하는 장면을 반복해서 볼 수 있고, 자막이나 음성을 원하는 대로 설정할 수 있습니다.</li>
        <li><strong>개인화:</strong> 자신만의 환경에서 보는 자유로움이 있습니다.</li>
      </ul>
      
      <h3>집에서 보기의 단점</h3>
      <ul>
        <li><strong>화질과 음질:</strong> 집의 TV나 오디오 시스템에 따라 화질과 음질이 제한될 수 있습니다.</li>
        <li><strong>방해 요소:</strong> 전화, 메시지, 가족의 방해 등이 있을 수 있습니다.</li>
        <li><strong>몰입도:</strong> 영화관만큼의 몰입감을 느끼기 어려울 수 있습니다.</li>
        <li><strong>최신작 지연:</strong> OTT 서비스에서 최신 영화를 보려면 시간이 걸립니다.</li>
      </ul>
      
      <h3>상황별 추천</h3>
      <h4>영화관 추천 상황:</h4>
      <ul>
        <li>액션 영화, SF 영화, 시각적 효과가 뛰어난 영화</li>
        <li>데이트나 특별한 날</li>
        <li>친구들과 함께 보는 경우</li>
        <li>최신 블록버스터 영화</li>
      </ul>
      
      <h4>집에서 보기 추천 상황:</h4>
      <ul>
        <li>로맨스 영화, 코미디 영화, 가족 영화</li>
        <li>혼자서 편안하게 보고 싶을 때</li>
        <li>시간에 구애받지 않고 보고 싶을 때</li>
        <li>클래식이나 아트 영화</li>
      </ul>
      
      <h3>최적의 선택 방법</h3>
      <p>결국 자신의 상황과 취향에 맞는 방법을 선택하는 것이 가장 중요합니다. 다음과 같은 기준으로 선택해보세요:</p>
      <ul>
        <li><strong>영화의 특성:</strong> 시각적 효과가 중요한 영화는 영화관, 스토리가 중요한 영화는 집에서</li>
        <li><strong>관람 목적:</strong> 오락을 목적으로 하면 영화관, 학습이나 감상을 목적으로 하면 집에서</li>
        <li><strong>예산:</strong> 예산이 넉넉하면 영화관, 절약하고 싶으면 집에서</li>
        <li><strong>시간:</strong> 시간이 여유롭고 특별한 경험을 원하면 영화관, 편리함을 원하면 집에서</li>
      </ul>
      
      <p>두 방법 모두 각각의 장점이 있으므로, 영화의 특성과 자신의 상황에 맞게 선택하는 것이 가장 좋습니다. 또한 같은 영화를 두 번 보는 것도 좋은 방법입니다. 첫 번째는 영화관에서 몰입감을 느끼고, 두 번째는 집에서 세부적인 요소들을 다시 감상하는 것이죠.</p>
    `,
    author: "영화 애호가 이영화",
    date: "2024-12-05",
    readTime: "5분",
    category: "영화 팁",
    tags: ["영화관", "집에서 보기", "관람 방법", "비교"]
  },
  {
    id: 4,
    title: "영화 평점 시스템 완벽 가이드 - 어떻게 평점을 매길까?",
    excerpt: "영화 평점의 의미와 기준, 그리고 자신만의 평점 시스템을 만드는 방법을 상세히 설명합니다.",
    content: `
      <h2>영화 평점 시스템 완벽 가이드</h2>
      <p>영화를 보고 나서 평점을 매기는 것은 자신의 감상 기록과 다른 사람들과의 소통을 위한 좋은 방법입니다. 체계적인 평점 시스템을 통해 더욱 의미 있는 영화 감상 경험을 만들어보세요.</p>
      
      <h3>일반적인 평점 기준</h3>
      <h4>5점 만점 시스템</h4>
      <ul>
        <li><strong>5점 (완벽):</strong> 모든 면에서 완벽한 명작. 다시 보고 싶고, 다른 사람들에게 적극 추천하고 싶은 작품</li>
        <li><strong>4점 (매우 좋음):</strong> 대부분 훌륭하지만 약간의 아쉬움이 있음. 추천할 만한 좋은 작품</li>
        <li><strong>3점 (보통):</strong> 괜찮지만 특별하지는 않음. 시간이 있을 때 보면 좋은 작품</li>
        <li><strong>2점 (아쉬움):</strong> 기대에 못 미치는 작품. 아쉬운 점이 많은 작품</li>
        <li><strong>1점 (실망):</strong> 전혀 추천하지 않을 작품. 시간 낭비라고 느끼는 작품</li>
      </ul>
      
      <h4>10점 만점 시스템</h4>
      <ul>
        <li><strong>9-10점:</strong> 걸작급 명작</li>
        <li><strong>7-8점:</strong> 좋은 작품</li>
        <li><strong>5-6점:</strong> 보통의 작품</li>
        <li><strong>3-4점:</strong> 아쉬운 작품</li>
        <li><strong>1-2점:</strong> 실망스러운 작품</li>
      </ul>
      
      <h3>평점 매기는 기준</h3>
      <p>평점을 매길 때는 다음과 같은 요소들을 종합적으로 고려해보세요:</p>
      
      <h4>스토리 (Story)</h4>
      <ul>
        <li>줄거리의 흥미도와 논리성</li>
        <li>전개 속도와 긴장감</li>
        <li>결말의 만족도</li>
        <li>메시지나 주제의식</li>
      </ul>
      
      <h4>연기 (Acting)</h4>
      <ul>
        <li>주연 배우들의 연기력</li>
        <li>조연 배우들의 연기력</li>
        <li>캐릭터의 매력도</li>
        <li>연기자들의 화학 반응</li>
      </ul>
      
      <h4>연출 (Direction)</h4>
      <ul>
        <li>감독의 연출력</li>
        <li>영상미와 촬영 기법</li>
        <li>편집의 완성도</li>
        <li>전체적인 완성도</li>
      </ul>
      
      <h4>음악 (Music)</h4>
      <ul>
        <li>영화 분위기에 맞는 음악</li>
        <li>주제곡의 임팩트</li>
        <li>음향 효과의 완성도</li>
      </ul>
      
      <h4>전체적 만족도</h4>
      <ul>
        <li>개인적인 감동과 재미</li>
        <li>다시 보고 싶은 정도</li>
        <li>추천하고 싶은 정도</li>
        <li>기대 대비 만족도</li>
      </ul>
      
      <h3>자신만의 평점 시스템 만들기</h3>
      <p>기존의 5점 만점 시스템 외에도 다음과 같은 방법들을 시도해볼 수 있습니다:</p>
      
      <h4>등급 시스템</h4>
      <ul>
        <li><strong>A+ (최고):</strong> 걸작급 명작</li>
        <li><strong>A (우수):</strong> 매우 좋은 작품</li>
        <li><strong>B+ (양호):</strong> 좋은 작품</li>
        <li><strong>B (보통):</strong> 괜찮은 작품</li>
        <li><strong>C (아쉬움):</strong> 아쉬운 작품</li>
        <li><strong>D (실망):</strong> 실망스러운 작품</li>
        <li><strong>F (최악):</strong> 전혀 추천하지 않을 작품</li>
      </ul>
      
      <h4>별점 시스템</h4>
      <ul>
        <li>⭐⭐⭐⭐⭐ (5점): 걸작</li>
        <li>⭐⭐⭐⭐ (4점): 매우 좋음</li>
        <li>⭐⭐⭐ (3점): 보통</li>
        <li>⭐⭐ (2점): 아쉬움</li>
        <li>⭐ (1점): 실망</li>
      </ul>
      
      <h4>감정 기반 평점</h4>
      <ul>
        <li>😍 (완전 사랑): 최고의 작품</li>
        <li>😊 (좋음): 좋은 작품</li>
        <li>😐 (보통): 괜찮은 작품</li>
        <li>😞 (아쉬움): 아쉬운 작품</li>
        <li>😢 (실망): 실망스러운 작품</li>
      </ul>
      
      <h4>카테고리별 평점</h4>
      <p>각 요소별로 평점을 매기고 종합하는 방법:</p>
      <ul>
        <li>스토리: /10</li>
        <li>연기: /10</li>
        <li>연출: /10</li>
        <li>음악: /10</li>
        <li>총점: /40</li>
      </ul>
      
      <h3>평점 매기는 팁</h3>
      <ul>
        <li><strong>즉석 평가 피하기:</strong> 영화를 보고 나서 바로 평점을 매기지 말고, 하루 정도 시간을 두고 생각해보세요.</li>
        <li><strong>비교 기준 설정:</strong> 자신만의 기준 영화를 정해서 상대적으로 평가하세요.</li>
        <li><strong>장르별 기준:</strong> 액션 영화와 로맨스 영화는 다른 기준으로 평가해야 합니다.</li>
        <li><strong>개인적 취향 고려:</strong> 객관적 평가와 개인적 취향을 구분해서 생각해보세요.</li>
        <li><strong>재평가:</strong> 시간이 지난 후 다시 보면서 평점을 수정해보세요.</li>
      </ul>
      
      <h3>평점 활용 방법</h3>
      <ul>
        <li><strong>영화 기록:</strong> 평점과 함께 간단한 감상평을 작성하세요.</li>
        <li><strong>추천 시스템:</strong> 높은 평점의 영화들을 친구들에게 추천하세요.</li>
        <li><strong>트렌드 분석:</strong> 자신의 평점 패턴을 분석해서 취향을 파악하세요.</li>
        <li><strong>목표 설정:</strong> 연간 영화 감상 목표를 세우고 평점을 기준으로 평가하세요.</li>
      </ul>
      
      <p>가장 중요한 것은 일관된 기준으로 평점을 매기는 것입니다. 이를 통해 자신의 영화 취향을 더 잘 파악할 수 있고, 다른 사람들에게도 유용한 정보를 제공할 수 있습니다. 또한 평점은 절대적인 기준이 아니라 자신만의 기준이므로, 너무 완벽하게 매기려고 하지 말고 즐겁게 활용하는 것이 좋습니다.</p>
    `,
    author: "영화 리뷰어 최영화",
    date: "2024-11-28",
    readTime: "7분",
    category: "영화 팁",
    tags: ["평점", "영화 리뷰", "평가 기준", "가이드"]
  },
  {
    id: 5,
    title: "클래식 영화 추천 - 시대를 초월한 명작들",
    excerpt: "과거의 명작 영화들을 소개하며, 왜 지금도 사랑받는지 그 이유를 설명합니다. 영화사에 길이 남을 걸작들을 만나보세요.",
    content: `
      <h2>시대를 초월한 클래식 영화들</h2>
      <p>시간이 흘러도 변하지 않는 가치를 지닌 클래식 영화들은 지금 봐도 충분히 감동적이고 의미 있는 작품들입니다. 이러한 작품들은 영화사에 길이 남을 걸작들이며, 현대 영화의 기반이 되는 중요한 작품들입니다.</p>
      
      <h3>할리우드 클래식</h3>
      <h4>시티라이트 (1931)</h4>
      <p>찰리 채플린의 걸작으로, 무성영화 시대의 마지막 명작입니다. 소설가와 맹인 꽃파는 여인의 아름다운 사랑 이야기를 담고 있으며, 채플린 특유의 유머와 감동이 절묘하게 조화를 이룹니다.</p>
      
      <h4>카사블랑카 (1942)</h4>
      <p>전쟁 중의 사랑 이야기로 로맨스 영화의 교과서라고 불리는 작품입니다. 험프리 보가트와 잉그리드 버그만의 완벽한 연기와 감동적인 스토리가 지금도 많은 사랑을 받고 있습니다.</p>
      
      <h4>시민 케인 (1941)</h4>
      <p>오슨 웰스의 걸작으로 영화사상 가장 위대한 작품으로 평가받는 작품입니다. 혁신적인 촬영 기법과 편집 기법이 사용되었으며, 현대 영화의 기법들이 대부분 이 영화에서 시작되었다고 해도 과언이 아닙니다.</p>
      
      <h4>아버지와 아들 (1972)</h4>
      <p>프랜시스 포드 코폴라의 대작으로 마피아 영화의 원형이 된 작품입니다. 말론 브란도와 알 파치노의 뛰어난 연기가 돋보이며, 권력과 가족의 이야기를 깊이 있게 다루고 있습니다.</p>
      
      <h4>벤허 (1959)</h4>
      <p>윌리엄 와일러 감독의 대작으로, 고대 로마를 배경으로 한 웅장한 서사시입니다. 전차 경주 장면은 영화사상 가장 유명한 장면 중 하나로 꼽힙니다.</p>
      
      <h3>유럽 영화</h3>
      <h4>8과 1/2 (1963)</h4>
      <p>페데리코 펠리니의 자전적 작품으로 영화 속 영화를 다룬 메타 영화의 대표작입니다. 영화 제작의 과정과 감독의 내면을 깊이 있게 탐구한 작품으로, 현대 영화에 큰 영향을 미쳤습니다.</p>
      
      <h4>400번의 구타 (1959)</h4>
      <p>프랑스 누벨바그의 대표작으로 프랑수아 트뤼포의 걸작입니다. 13살 소년의 이야기를 통해 현대 사회의 문제점을 날카롭게 지적한 작품입니다.</p>
      
      <h4>안드레이 루블레프 (1966)</h4>
      <p>안드레이 타르코프스키의 영화 예술의 정수라고 불리는 작품입니다. 15세기 러시아 화가 안드레이 루블레프의 삶을 통해 예술과 종교, 인간성에 대한 깊이 있는 탐구를 보여줍니다.</p>
      
      <h4>일곱 번째 인장 (1957)</h4>
      <p>잉마르 베리만의 걸작으로, 중세 시대를 배경으로 한 철학적 영화입니다. 죽음과 신에 대한 깊이 있는 질문을 던지는 작품으로, 베리만 특유의 철학적 깊이가 돋보입니다.</p>
      
      <h3>아시아 영화</h3>
      <h4>도쿄 이야기 (1953)</h4>
      <p>오즈 야스지로의 가족 드라마로, 일본 영화의 대표작입니다. 노부모와 성인 자녀들 간의 관계를 통해 가족의 의미를 깊이 있게 탐구한 작품입니다.</p>
      
      <h4>춘향전 (1955)</h4>
      <p>한국 영화사의 고전으로, 전통 설화를 영화로 각색한 작품입니다. 한국의 전통 문화와 가치관을 잘 보여주는 작품으로, 한국 영화의 역사적 가치가 높습니다.</p>
      
      <h4>화양연화 (2000)</h4>
      <p>왕가위의 아름다운 연출이 돋보이는 작품으로, 홍콩을 배경으로 한 로맨스 영화입니다. 아름다운 영상미와 감성적인 스토리가 조화를 이룬 작품입니다.</p>
      
      <h4>라쇼몬 (1950)</h4>
      <p>구로사와 아키라의 걸작으로, 같은 사건을 여러 관점에서 보여주는 혁신적인 구조의 영화입니다. 진실의 상대성을 다룬 철학적 작품으로, 현대 영화에 큰 영향을 미쳤습니다.</p>
      
      <h3>클래식 영화를 보는 이유</h3>
      <h4>영화사적 가치</h4>
      <p>클래식 영화는 단순히 과거의 작품이 아닙니다. 현대 영화의 기반이 되고, 영화 언어의 발전 과정을 보여주는 중요한 자료입니다. 이러한 작품들을 통해 영화가 어떻게 발전해왔는지 이해할 수 있습니다.</p>
      
      <h4>예술적 가치</h4>
      <p>클래식 영화들은 예술적 완성도가 높은 작품들입니다. 뛰어난 연출, 연기, 촬영, 편집 등 모든 면에서 완성도가 높으며, 예술 작품으로서의 가치를 지니고 있습니다.</p>
      
      <h4>보편적 가치</h4>
      <p>시간이 흘러도 변하지 않는 인간의 보편적 감정과 상황을 담고 있어 지금 봐도 충분히 공감할 수 있습니다. 사랑, 죽음, 가족, 우정 등 인간의 근본적인 주제들을 다루고 있습니다.</p>
      
      <h4>영감과 학습</h4>
      <p>현대 영화 제작자들에게 영감을 주는 작품들이며, 영화를 배우고 싶은 사람들에게는 최고의 교과서 역할을 합니다.</p>
      
      <h3>클래식 영화 감상 팁</h3>
      <ul>
        <li><strong>역사적 맥락 이해:</strong> 영화가 만들어진 시대적 배경을 이해하면 더욱 깊이 있게 감상할 수 있습니다.</li>
        <li><strong>기술적 혁신 파악:</strong> 당시로서는 혁신적이었던 촬영 기법이나 편집 기법을 찾아보세요.</li>
        <li><strong>현대 영화와 비교:</strong> 현대 영화와 비교해보면서 영화의 발전 과정을 이해해보세요.</li>
        <li><strong>여러 번 감상:</strong> 한 번에 모든 것을 이해하기 어려우니 여러 번 보면서 깊이를 더해보세요.</li>
        <li><strong>평론과 해석 읽기:</strong> 전문가들의 평론과 해석을 읽어보면 더욱 깊이 있는 이해가 가능합니다.</li>
      </ul>
      
      <p>영화를 진정으로 사랑한다면, 이런 클래식 작품들을 통해 영화의 역사와 발전 과정을 이해하는 것이 중요합니다. 또한 이러한 작품들은 단순히 과거의 작품이 아니라 현재에도 충분히 감동적이고 의미 있는 작품들입니다. 시간을 내어 이런 걸작들을 감상해보시면 영화에 대한 새로운 시각과 깊이 있는 이해를 얻을 수 있을 것입니다.</p>
    `,
    author: "영화사학자 정영화",
    date: "2024-11-20",
    readTime: "9분",
    category: "클래식 영화",
    tags: ["클래식", "명작", "영화사", "추천"]
  }
];

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">포스트를 찾을 수 없습니다</h1>
          <Link 
            href="/blog"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* 뒤로가기 버튼 */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>블로그로 돌아가기</span>
          </Link>
        </div>

        {/* 포스트 헤더 */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
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
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* 포스트 내용 */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* 태그 */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4">태그</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 관련 포스트 추천 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            추천 포스트
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">{relatedPost.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {relatedPost.date}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
