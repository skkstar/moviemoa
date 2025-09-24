'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film, Star, BarChart3, LogIn, LogOut, User, Search, Menu, BookOpen, CreditCard, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { user, loading, signInWithGoogle, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: '홈', icon: Film },
    { href: '/search', label: '영화 검색', icon: Search },
    { href: '/my-movies', label: '내 컬렉션', icon: Star },
    { href: '/blog', label: '블로그', icon: BookOpen },
    { href: '/premium', label: '프리미엄', icon: Crown },
    { href: '/payments', label: '결제 관리', icon: CreditCard },
  ]

  // 개발자용 테스트 페이지 (로그인된 사용자만 보임)
  const testNavItems = user ? [
    { href: '/payment-test', label: '결제 테스트', icon: CreditCard },
    { href: '/payment-integration-test', label: 'API 연동 테스트', icon: CreditCard },
  ] : []

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <nav 
      className="sticky top-0 z-50"
      style={{ 
        background: 'rgba(15, 15, 35, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-colors hover:opacity-80"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' }}>
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">MOVEA</span>
          </Link>

          {/* 데스크톱 네비게이션 메뉴 */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? 'hover:scale-105' : 'hover:bg-white/10'
                  }`}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#FFFFFF',
                    borderRadius: '12px'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {/* 테스트 페이지 링크 */}
            {testNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? 'hover:scale-105' : 'hover:bg-white/10'
                  }`}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#FFFFFF',
                    borderRadius: '12px',
                    opacity: 0.8
                  }}
                  title="개발자 테스트 페이지"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {/* 인증 버튼 */}
            <div className="ml-4 flex items-center gap-2">
              {loading ? (
                <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-400 rounded-full animate-spin"></div>
              ) : user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <User className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-white">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #DC3545 0%, #FF6B6B 100%)',
                      color: '#FFFFFF',
                      borderRadius: '12px'
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>로그아웃</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                    color: '#FFFFFF',
                    borderRadius: '12px'
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>로그인</span>
                </button>
              )}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors hover:opacity-80 text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive ? 'hover:scale-105' : 'hover:bg-white/10'
                    }`}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' : 'transparent',
                      color: '#FFFFFF',
                      borderRadius: '12px'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              {/* 모바일 테스트 페이지 링크 */}
              {testNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive ? 'hover:scale-105' : 'hover:bg-white/10'
                    }`}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' : 'transparent',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      opacity: 0.8
                    }}
                    title="개발자 테스트 페이지"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              {/* 모바일 인증 버튼 */}
              <div className="mt-2">
                {loading ? (
                  <div className="flex items-center justify-center py-3">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-400 rounded-full animate-spin"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <User className="w-5 h-5 text-purple-400" />
                      <span className="text-white">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #DC3545 0%, #FF6B6B 100%)',
                        color: '#FFFFFF',
                        borderRadius: '12px'
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>로그아웃</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                      color: '#FFFFFF',
                      borderRadius: '12px'
                    }}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>로그인</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
