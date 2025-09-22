'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Calendar, Trash2, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getImageUrl, convertRatingToStars, formatDate } from '@/lib/tmdb'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

interface MovieRating {
  id: string
  movie_id: number
  movie_title: string
  movie_poster_path: string | null
  movie_release_date: string
  user_rating: number
  user_review: string | null
  watched_date: string
  created_at: string
  updated_at: string
}

export default function MyMoviesPage() {
  const { user, loading: authLoading } = useAuth()
  const [ratings, setRatings] = useState<MovieRating[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState(0)
  const [sortBy, setSortBy] = useState<'watched_date' | 'user_rating' | 'created_at'>('watched_date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const loadRatings = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('movie_ratings')
        .select('*')
        .eq('user_id', user.id)
        .order(sortBy, { ascending: sortOrder === 'asc' })

      if (error) {
        throw error
      }

      setRatings(data || [])
    } catch (err) {
      setError('영화 목록을 불러오는 중 오류가 발생했습니다.')
      console.error('영화 목록 로드 오류:', err)
    } finally {
      setLoading(false)
    }
  }, [user, sortBy, sortOrder])

  // 영화 평점 목록 로드
  useEffect(() => {
    if (user) {
      loadRatings()
    } else if (!authLoading) {
      setLoading(false)
    }
  }, [user, authLoading, loadRatings])

  // 평점 삭제 함수
  const handleDeleteRating = async (ratingId: string) => {
    if (!confirm('정말로 이 평점을 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('movie_ratings')
        .delete()
        .eq('id', ratingId)

      if (error) {
        throw error
      }

      // 목록에서 제거
      setRatings(ratings.filter(rating => rating.id !== ratingId))
    } catch (err) {
      console.error('평점 삭제 오류:', err)
      alert('평점 삭제 중 오류가 발생했습니다.')
    }
  }

  // 필터링된 영화 목록
  const filteredRatings = ratings.filter(rating => {
    const matchesSearch = rating.movie_title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = filterRating === 0 || rating.user_rating === filterRating
    return matchesSearch && matchesRating
  })

  // 통계 계산
  const totalMovies = ratings.length
  const averageRating = ratings.length > 0 
    ? (ratings.reduce((sum, rating) => sum + rating.user_rating, 0) / ratings.length).toFixed(1)
    : '0.0'
  const ratingDistribution = [1, 2, 3, 4, 5].map(star => 
    ratings.filter(rating => rating.user_rating === star).length
  )

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #F8F9FA 0%, #E9ECEF 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#0D6EFD' }}></div>
          <div className="text-xl" style={{ color: '#212529' }}>영화 목록을 불러오는 중...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #F8F9FA 0%, #E9ECEF 100%)' }}>
        <div 
          className="p-8 text-center"
          style={{ 
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
          }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>로그인이 필요합니다</h2>
          <p className="mb-6" style={{ color: '#6C757D' }}>영화 평점을 확인하려면 로그인해주세요.</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)', 
              color: '#FFFFFF',
              borderRadius: '12px'
            }}
          >
            영화 검색하기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">내 영화 컬렉션</h1>
          <p className="text-xl text-gray-300">평점을 매긴 영화들을 관리하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="p-6 text-center"
            style={{ 
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#0D6EFD' }}>{totalMovies}</div>
            <div style={{ color: '#6C757D' }}>총 영화 수</div>
          </div>
          <div 
            className="p-6 text-center"
            style={{ 
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFC107' }}>{averageRating}</div>
            <div style={{ color: '#6C757D' }}>평균 평점</div>
          </div>
          <div 
            className="p-6 text-center"
            style={{ 
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}
          >
            <div className="text-3xl font-bold mb-2" style={{ color: '#198754' }}>
              {ratingDistribution[4]}개
            </div>
            <div style={{ color: '#6C757D' }}>5점 영화</div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div 
          className="p-6 mb-8"
          style={{ 
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6C757D' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="영화 제목 검색..."
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  background: '#F8F9FA',
                  border: '1px solid #E9ECEF',
                  color: '#212529'
                }}
              />
            </div>

            {/* 평점 필터 */}
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                background: '#F8F9FA',
                border: '1px solid #E9ECEF',
                color: '#212529'
              }}
            >
              <option value={0}>모든 평점</option>
              <option value={5}>5점</option>
              <option value={4}>4점</option>
              <option value={3}>3점</option>
              <option value={2}>2점</option>
              <option value={1}>1점</option>
            </select>

            {/* 정렬 기준 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'watched_date' | 'user_rating' | 'created_at')}
              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                background: '#F8F9FA',
                border: '1px solid #E9ECEF',
                color: '#212529'
              }}
            >
              <option value="watched_date">감상일</option>
              <option value="user_rating">평점</option>
              <option value="created_at">저장일</option>
            </select>

            {/* 정렬 순서 */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                background: '#F8F9FA',
                border: '1px solid #E9ECEF',
                color: '#212529'
              }}
            >
              <option value="desc">최신순</option>
              <option value="asc">오래된순</option>
            </select>
          </div>
        </div>

        {/* 오류 메시지 */}
        {error && (
          <div 
            className="rounded-lg p-4 mb-6"
            style={{ 
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              color: '#DC3545'
            }}
          >
            {error}
          </div>
        )}

        {/* 영화 목록 */}
        {filteredRatings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl mb-4" style={{ color: '#6C757D' }}>
              {ratings.length === 0 ? '아직 평점을 매긴 영화가 없습니다' : '검색 결과가 없습니다'}
            </div>
            {ratings.length === 0 && (
              <Link
                href="/movies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                style={{ 
                  background: '#0D6EFD', 
                  color: '#FFFFFF',
                  borderRadius: '8px'
                }}
              >
                영화 검색하기
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRatings.map((rating) => (
              <div
                key={rating.id}
                className="overflow-hidden hover:scale-105 transition-all duration-300"
                style={{ 
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
                }}
              >
                {/* 포스터 이미지 */}
                <div className="aspect-[2/3] relative">
                  <img
                    src={getImageUrl(rating.movie_poster_path, 'w500')}
                    alt={rating.movie_title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-movie.jpg'
                    }}
                  />
                  {/* 평점 오버레이 */}
                  <div className="absolute top-2 right-2 rounded-lg px-2 py-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#FFC107' }}>
                      <Star className="w-3 h-3 fill-current" />
                      {rating.user_rating}
                    </div>
                  </div>
                </div>

                {/* 영화 정보 */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: '#212529' }}>
                    {rating.movie_title}
                  </h3>
                  
                  <div className="space-y-2 text-sm mb-4" style={{ color: '#6C757D' }}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(rating.watched_date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: '#FFC107' }} />
                      <span>{convertRatingToStars(rating.user_rating)}</span>
                    </div>
                  </div>

                  {/* 리뷰 */}
                  {rating.user_review && (
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: '#495057' }}>
                      &ldquo;{rating.user_review}&rdquo;
                    </p>
                  )}

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <Link
                      href={`/movie/${rating.movie_id}`}
                      className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center hover:opacity-90"
                      style={{ 
                        background: '#0D6EFD', 
                        color: '#FFFFFF',
                        borderRadius: '8px'
                      }}
                    >
                      상세보기
                    </Link>
                    <button
                      onClick={() => handleDeleteRating(rating.id)}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                      style={{ 
                        background: '#DC3545', 
                        color: '#FFFFFF',
                        borderRadius: '8px'
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 평점 분포 차트 */}
        {ratings.length > 0 && (
          <div 
            className="mt-12 p-6"
            style={{ 
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#212529' }}>평점 분포</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="w-8 font-semibold" style={{ color: '#FFC107' }}>{star}점</div>
                  <div className="flex-1 rounded-full h-2" style={{ background: '#E9ECEF' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        background: '#FFC107',
                        width: `${(ratingDistribution[star - 1] / totalMovies) * 100}%`
                      }}
                    />
                  </div>
                  <div className="w-12 text-sm text-right" style={{ color: '#6C757D' }}>
                    {ratingDistribution[star - 1]}개
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
