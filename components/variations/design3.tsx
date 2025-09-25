'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film, Star, BarChart3, LogIn, LogOut, User, Search, Menu, BookOpen, CreditCard, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import styles from '../../styles/variations/design3.module.css'

// Navigation 컴포넌트의 Props 인터페이스 정의
interface NavigationProps {
  className?: string
  style?: React.CSSProperties
}

// Design 3: Vibrant Gradient - 화려한 그라디언트와 애니메이션이 있는 디자인
const Design3Navigation: React.FC<NavigationProps> = ({ className = '', style = {} }) => {
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
    { href: '/supabase-config', label: 'Supabase 설정', icon: CreditCard },
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
      className={`${styles.navbar} ${className}`}
      style={style}
    >
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* 로고 - 화려한 그라디언트 디자인 */}
          <Link 
            href="/" 
            className={styles.logo}
          >
            <div className={styles.logoIcon}>
              <Film className={styles.logoIconSvg} />
            </div>
            <span className={styles.logoText}>MOVEA</span>
          </Link>

          {/* 데스크톱 네비게이션 메뉴 */}
          <div className={styles.desktopMenu}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
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
                  className={`${styles.navItem} ${styles.navItemTest} ${isActive ? styles.navItemActive : ''}`}
                  title="개발자 테스트 페이지"
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )
            })}
            
            {/* 인증 버튼 */}
            <div className={styles.authSection}>
              {loading ? (
                <div className={styles.loadingSpinner}></div>
              ) : user ? (
                <div className={styles.userSection}>
                  <div className={styles.userInfo}>
                    <User className={styles.userIcon} />
                    <span className={styles.userName}>
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className={styles.logoutButton}
                  >
                    <LogOut className={styles.buttonIcon} />
                    <span>로그아웃</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className={styles.loginButton}
                >
                  <LogIn className={styles.buttonIcon} />
                  <span>로그인</span>
                </button>
              )}
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className={styles.mobileMenuButton}>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileMenuToggle}
            >
              <Menu className={styles.mobileMenuIcon} />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
                  >
                    <Icon className={styles.mobileNavIcon} />
                    <span className={styles.mobileNavLabel}>{item.label}</span>
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
                    className={`${styles.mobileNavItem} ${styles.mobileNavItemTest} ${isActive ? styles.mobileNavItemActive : ''}`}
                    title="개발자 테스트 페이지"
                  >
                    <Icon className={styles.mobileNavIcon} />
                    <span className={styles.mobileNavLabel}>{item.label}</span>
                  </Link>
                )
              })}
              
              {/* 모바일 인증 버튼 */}
              <div className={styles.mobileAuthSection}>
                {loading ? (
                  <div className={styles.mobileLoadingSpinner}></div>
                ) : user ? (
                  <div className={styles.mobileUserSection}>
                    <div className={styles.mobileUserInfo}>
                      <User className={styles.mobileUserIcon} />
                      <span className={styles.mobileUserName}>
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className={styles.mobileLogoutButton}
                    >
                      <LogOut className={styles.mobileButtonIcon} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn()
                      setIsMobileMenuOpen(false)
                    }}
                    className={styles.mobileLoginButton}
                  >
                    <LogIn className={styles.mobileButtonIcon} />
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

export default Design3Navigation
