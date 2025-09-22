// TMDB API 설정 및 함수들
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjUzYjE3NThmNTIzMGRmYTZhMzQ3NjdmYjRhODJmZiIsIm5iZiI6MTc1ODQyMzA4OS43MzIsInN1YiI6IjY4Y2Y2ODMxOWNkMjNkMWJlN2NjMzFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4yjnkFDHFKouiyr2ekeOoZmZ3Pm_RxroUaurjsvlFEQ'
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

// 영화 검색 결과 타입 정의
export interface MovieSearchResult {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  adult: boolean
  genre_ids: number[]
  original_language: string
  popularity: number
  video: boolean
}

export interface MovieSearchResponse {
  page: number
  results: MovieSearchResult[]
  total_pages: number
  total_results: number
}

// 영화 상세 정보 타입 정의
export interface MovieDetails {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: Array<{
    id: number
    name: string
  }>
  production_companies: Array<{
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  budget: number
  revenue: number
  homepage: string
  imdb_id: string
  adult: boolean
  original_language: string
  popularity: number
  video: boolean
}

// 영화 검색 함수
export async function searchMovies(query: string, page: number = 1): Promise<MovieSearchResponse> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=ko-KR`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`TMDB API 오류: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('영화 검색 중 오류 발생:', error)
    throw error
  }
}

// 영화 상세 정보 조회 함수
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?language=ko-KR`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`TMDB API 오류: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('영화 상세 정보 조회 중 오류 발생:', error)
    throw error
  }
}

// 이미지 URL 생성 함수
export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) {
    return '/placeholder-movie.jpg' // 기본 이미지 경로
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// 평점을 별점으로 변환하는 함수
export function convertRatingToStars(rating: number): string {
  const stars = Math.round(rating / 2) // 10점 만점을 5점 만점으로 변환
  return '★'.repeat(stars) + '☆'.repeat(5 - stars)
}

// 날짜 포맷팅 함수
export function formatDate(dateString: string): string {
  if (!dateString) return '날짜 정보 없음'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 런타임을 시간:분 형식으로 변환하는 함수
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}시간 ${mins}분`
}

// 최신 영화 리스트 조회 함수
export async function getLatestMovies(page: number = 1): Promise<MovieSearchResponse> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?page=${page}&language=ko-KR`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`TMDB API 오류: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('최신 영화 조회 중 오류 발생:', error)
    throw error
  }
}

// 인기 영화 리스트 조회 함수
export async function getPopularMovies(page: number = 1): Promise<MovieSearchResponse> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?page=${page}&language=ko-KR`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`TMDB API 오류: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('인기 영화 조회 중 오류 발생:', error)
    throw error
  }
}
