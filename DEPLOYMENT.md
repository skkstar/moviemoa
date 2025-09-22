# GitHub Pages 배포 가이드

## 🚀 배포 방법

### 1. 자동 배포 (GitHub Actions)
- `main` 브랜치에 코드를 푸시하면 자동으로 GitHub Pages에 배포됩니다.
- GitHub Actions 워크플로우가 빌드와 배포를 자동으로 처리합니다.

### 2. 수동 배포
```bash
npm run deploy
```

## 📋 배포 전 체크리스트

1. **GitHub 저장소 생성**
   - GitHub에서 새 저장소 생성
   - 저장소 이름: `figma_plugin` (또는 원하는 이름)

2. **GitHub Pages 설정**
   - 저장소 Settings → Pages
   - Source: "GitHub Actions" 선택
   - 또는 "Deploy from a branch" → "gh-pages" 브랜치 선택

3. **환경 변수 확인**
   - 모든 API 키가 코드에 하드코딩되어 있어 추가 설정 불필요

## 🔗 접속 URL

배포 완료 후 접속 가능한 URL:
**https://[GitHub사용자명].github.io/figma_plugin/**

예시:
- `https://john-doe.github.io/figma_plugin/`
- `https://myusername.github.io/figma_plugin/`

## 🛠️ 기술적 세부사항

### Next.js 설정
- `basePath`: `/figma_plugin` (프로덕션 환경)
- `assetPrefix`: `/figma_plugin` (프로덕션 환경)
- `trailingSlash`: `true`
- `images.unoptimized`: `true`

### 빌드 결과물
- 정적 페이지: 9개
- 동적 라우트: `/movie/[id]` (클라이언트 사이드 렌더링)
- 총 번들 크기: ~168KB

### 지원 기능
- ✅ 영화 검색
- ✅ 영화 상세 정보
- ✅ 사용자 인증 (Google OAuth)
- ✅ 평점 저장 및 관리
- ✅ 반응형 디자인

## 🐛 문제 해결

### 빌드 실패 시
1. 린트 오류 확인: `npm run lint`
2. 타입 오류 확인: `npm run build`
3. 의존성 재설치: `rm -rf node_modules && npm install`

### 배포 실패 시
1. GitHub Actions 로그 확인
2. 환경 변수 설정 확인
3. 저장소 권한 확인

## 📞 지원

문제가 발생하면 GitHub Issues에 문의하세요.




