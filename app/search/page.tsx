'use client'

import { useState } from 'react'
import { Search, Star, Calendar, Film } from 'lucide-react'
import { searchMovies, getImageUrl, convertRatingToStars, formatDate, MovieSearchResult } from '@/lib/tmdb'
import Link from 'next/link'

export default function MovieSearchPage() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // 영화 검색 함수
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const response = await searchMovies(query)
      setSearchResults(response.results)
    } catch (err) {
      setError('영화 검색 중 오류가 발생했습니다.')
      console.error('검색 오류:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">영화 검색</h1>
          <p className="text-xl text-gray-300">TMDB API를 통해 영화를 검색하세요</p>
        </div>

        {/* 검색 폼 */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="영화 제목 검색..."
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)', 
                color: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
              }}
            >
              검색
            </button>
          </form>
        </div>

        {/* 로딩 및 오류 메시지 */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FF6B6B' }}></div>
            <div className="text-xl text-white">영화 검색 중...</div>
          </div>
        )}

        {error && (
          <div 
            className="rounded-lg p-4 mb-6 text-center"
            style={{ 
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              color: '#DC3545'
            }}
          >
            {error}
          </div>
        )}

        {/* 검색 결과 */}
        {hasSearched && !loading && !error && searchResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-300">검색 결과가 없습니다.</p>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <Link 
                href={`/movie/${movie.id}`} 
                key={movie.id}
                className="block overflow-hidden hover:scale-105 transition-all duration-300"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px'
                }}
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-movie.jpg'
                    }}
                  />
                  <div className="absolute top-2 right-2 rounded-lg px-2 py-1" style={{ background: 'rgba(0,0,0,0.8)' }}>
                    <div className="flex items-center gap-1 text-sm font-semibold text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{formatDate(movie.release_date)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



