# 영화 아카이브 웹사이트

TMDB API를 사용하여 영화를 검색하고 개인 평점을 저장할 수 있는 웹사이트입니다.

## 🚀 배포된 사이트

GitHub Pages로 배포된 사이트: **https://[사용자명].github.io/figma_plugin/**

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **API**: TMDB API
- **Authentication**: Supabase Auth (Google OAuth)

## 📋 주요 기능

- 🔍 영화 검색 (TMDB API 연동)
- ⭐ 개인 평점 및 리뷰 저장
- 📊 영화 감상 통계 분석
- 🔐 Google 로그인 인증
- 📱 반응형 디자인

## 🚀 로컬 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/[사용자명]/figma_plugin.git
cd figma_plugin
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 `http://localhost:3000` 접속

## 📦 배포

### 자동 배포 (GitHub Actions)
- `main` 브랜치에 푸시하면 자동으로 GitHub Pages에 배포됩니다.

### 수동 배포
```bash
npm run deploy
```

## 🔧 환경 변수

프로젝트는 다음 환경 변수를 사용합니다:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 익명 키
- `NEXT_PUBLIC_TMDB_API_KEY`: TMDB API 키
- `NEXT_PUBLIC_TMDB_BASE_URL`: TMDB API 기본 URL
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`: TMDB 이미지 기본 URL

## 📁 프로젝트 구조

```
figma_plugin/
├── app/                    # Next.js 앱 라우터
│   ├── page.tsx           # 홈페이지
│   ├── movies/            # 영화 검색 페이지
│   ├── movie/[id]/        # 영화 상세 페이지
│   ├── my-movies/         # 내 영화 목록 페이지
│   └── auth/              # 인증 관련 페이지
├── components/             # 재사용 가능한 컴포넌트
├── contexts/              # React Context
├── lib/                   # 유틸리티 함수
├── .github/workflows/     # GitHub Actions 워크플로우
└── public/                # 정적 파일
```

## 🎯 사용 방법

1. **영화 검색**: 메인 페이지에서 "영화 검색하기" 버튼 클릭
2. **로그인**: Google 계정으로 로그인
3. **평점 저장**: 영화 상세 페이지에서 별점과 리뷰 작성
4. **내 영화 목록**: 저장된 영화들과 통계 확인

## 📄 라이선스

MIT License