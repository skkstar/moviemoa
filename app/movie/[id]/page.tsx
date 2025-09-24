'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Star, Calendar, Clock, Globe, DollarSign, Crown } from 'lucide-react'
import { getMovieDetails, getImageUrl, formatDate, formatRuntime, MovieDetails } from '@/lib/tmdb'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = parseInt(params.id as string)
  const { user } = useAuth()
  
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState('')
  const [watchedDate, setWatchedDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // 영화 상세 정보 로드
  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true)
        const movieData = await getMovieDetails(movieId)
        setMovie(movieData)
        
        // 오늘 날짜를 기본값으로 설정
        const today = new Date().toISOString().split('T')[0]
        setWatchedDate(today)
      } catch (err) {
        setError('영화 정보를 불러오는 중 오류가 발생했습니다.')
        console.error('영화 상세 정보 로드 오류:', err)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      loadMovieDetails()
    }
  }, [movieId])

  // 평점 저장 함수
  const handleSaveRating = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!movie || userRating === 0) {
      alert('평점을 선택해주세요.')
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from('movie_ratings')
        .insert({
          movie_id: movie.id,
          movie_title: movie.title,
          movie_poster_path: movie.poster_path,
          movie_release_date: movie.release_date,
          user_rating: userRating,
          user_review: userReview || null,
          watched_date: watchedDate,
          user_id: user.id
        })

      if (error) {
        throw error
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('평점 저장 오류:', err)
      alert('평점 저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">영화 정보를 불러오는 중...</div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || '영화를 찾을 수 없습니다.'}</div>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 영화 포스터 및 기본 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="aspect-[2/3] rounded-xl overflow-hidden mb-6">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-movie.jpg'
                  }}
                />
              </div>

              {/* 평점 저장 폼 */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-white text-lg font-semibold mb-4">내 평점 저장</h3>
                
                {/* 별점 선택 */}
                <div className="mb-4">
                  <label className="text-gray-300 text-sm mb-2 block">평점</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`w-8 h-8 text-2xl transition-colors ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* 감상일 */}
                <div className="mb-4">
                  <label className="text-gray-300 text-sm mb-2 block">감상일</label>
                  <input
                    type="date"
                    value={watchedDate}
                    onChange={(e) => setWatchedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* 리뷰 */}
                <div className="mb-6">
                  <label className="text-gray-300 text-sm mb-2 block">리뷰 (선택사항)</label>
                  <textarea
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="영화에 대한 생각을 적어보세요..."
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>

                {/* 저장 버튼 */}
                <button
                  onClick={handleSaveRating}
                  disabled={saving || userRating === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    saved
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-400 text-black hover:bg-yellow-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {saved ? '저장 완료!' : saving ? '저장 중...' : '평점 저장'}
                </button>
              </div>
            </div>

            {/* 프리미엄 구독 섹션 */}
            <div className="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">프리미엄으로 더 많은 기능 이용하기</h3>
              </div>
              <p className="text-gray-300 mb-4">
                무제한 영화 분석, 개인화된 추천, 독점 콘텐츠를 만나보세요!
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push('/premium')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  프리미엄 구독하기
                </button>
                <button
                  onClick={() => router.push('/premium')}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </div>

          {/* 영화 상세 정보 */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              {/* 제목 및 기본 정보 */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
                {movie.original_title !== movie.title && (
                  <p className="text-gray-300 text-lg mb-4">{movie.original_title}</p>
                )}
                {movie.tagline && (
                  <p className="text-yellow-400 text-lg italic mb-4">&ldquo;{movie.tagline}&rdquo;</p>
                )}

                <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}/10</span>
                    <span className="text-gray-400">({movie.vote_count.toLocaleString()}명)</span>
                  </div>
                </div>
              </div>

              {/* 장르 */}
              {movie.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white text-lg font-semibold mb-3">장르</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 줄거리 */}
              {movie.overview && (
                <div className="mb-8">
                  <h3 className="text-white text-lg font-semibold mb-3">줄거리</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>
              )}

              {/* 제작 정보 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* 제작사 */}
                {movie.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">제작사</h3>
                    <div className="space-y-2">
                      {movie.production_companies.map((company) => (
                        <div key={company.id} className="text-gray-300">
                          {company.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 제작 국가 */}
                {movie.production_countries.length > 0 && (
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">제작 국가</h3>
                    <div className="space-y-2">
                      {movie.production_countries.map((country) => (
                        <div key={country.iso_3166_1} className="text-gray-300">
                          {country.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 추가 정보 */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {movie.budget > 0 && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-5 h-5" />
                    <span>예산: ${movie.budget.toLocaleString()}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-5 h-5" />
                    <span>수익: ${movie.revenue.toLocaleString()}</span>
                  </div>
                )}
                {movie.homepage && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Globe className="w-5 h-5" />
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      공식 웹사이트
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
