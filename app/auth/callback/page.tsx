'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('인증 오류:', error)
          router.push('/?error=auth_failed')
          return
        }

        if (data.session) {
          // 로그인 성공
          router.push('/?success=login')
        } else {
          // 세션이 없음
          router.push('/')
        }
      } catch (err) {
        console.error('인증 처리 중 오류:', err)
        router.push('/?error=auth_failed')
      }
    }

    handleAuthCallback()
  }, [router])

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#0D6EFD' }}></div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#212529' }}>로그인 처리 중...</h2>
        <p style={{ color: '#6C757D' }}>잠시만 기다려주세요.</p>
      </div>
    </div>
  )
}



