'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Film, Star, BarChart3, Play, Calendar, TrendingUp, Search } from "lucide-react";
import { getLatestMovies, getPopularMovies, getImageUrl, formatDate, MovieSearchResult } from "@/lib/tmdb";
import MovieCarousel from "@/components/MovieCarousel";
import "@/components/MovieCarousel.css";

export default function Home() {
  const [latestMovies, setLatestMovies] = useState<MovieSearchResult[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [latestResponse, popularResponse] = await Promise.all([
          getLatestMovies(1),
          getPopularMovies(1)
        ]);
        
        setLatestMovies(latestResponse.results.slice(0, 8));
        setPopularMovies(popularResponse.results.slice(0, 6));
      } catch (error) {
        console.error('영화 로드 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FF6B6B' }}></div>
          <div className="text-xl text-white">영화를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              MOVEA
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              최신 영화를 발견하고, 평점을 남기고, 나만의 영화 컬렉션을 만들어보세요
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/search"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)', 
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
                }}
              >
                <Search className="w-5 h-5" />
                영화 검색
              </Link>
              <Link
                href="/my-movies"
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Star className="w-5 h-5" />
                내 컬렉션
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* 최신 영화 캐러셀 섹션 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' }}></div>
            <h2 className="text-3xl font-bold text-white">현재 상영중</h2>
            <Play className="w-6 h-6 text-purple-400" />
          </div>
          
          <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
            <MovieCarousel
              movies={latestMovies}
              speed={60}
              direction="left"
              movieHeight={260}
              gap={32}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#0F0F23"
              ariaLabel="현재 상영중인 영화"
            />
          </div>
        </section>

        {/* 인기 영화 섹션 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)' }}></div>
            <h2 className="text-3xl font-bold text-white">인기 영화</h2>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMovies.map((movie) => (
              <Link 
                href={`/movie/${movie.id}`} 
                key={movie.id}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex">
                  <div className="w-24 h-36 flex-shrink-0">
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
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{movie.overview}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(movie.release_date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 빠른 액션 섹션 */}
        <section className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">더 많은 영화를 탐색해보세요</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: '#FFFFFF',
                borderRadius: '12px'
              }}
            >
              영화 검색
            </Link>
            <Link
              href="/my-movies"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                color: '#FFFFFF',
                borderRadius: '12px'
              }}
            >
              내 컬렉션
            </Link>
            <Link
              href="/database-test"
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                color: '#FFFFFF',
                borderRadius: '12px'
              }}
            >
              데이터베이스 테스트
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}