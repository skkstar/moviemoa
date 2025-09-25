'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseConfigCheck() {
  const [config, setConfig] = useState<any>(null)

  const checkConfig = async () => {
    try {
      // Supabase 설정 정보 가져오기
      const { data, error } = await supabase.auth.getSession()
      
      setConfig({
        url: supabase.supabaseUrl,
        anonKey: supabase.supabaseKey?.substring(0, 20) + '...',
        hasSession: !!data.session,
        currentUrl: window.location.href,
        origin: window.location.origin,
        redirectUrl: `${window.location.origin}/auth/callback`
      })
    } catch (error) {
      console.error('설정 확인 오류:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Supabase 설정 확인</h2>
      
      <button
        onClick={checkConfig}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        설정 확인하기
      </button>

      {config && (
        <div className="space-y-3">
          <div>
            <strong>Supabase URL:</strong>
            <p className="text-sm text-gray-600 font-mono">{config.url}</p>
          </div>
          <div>
            <strong>Anon Key:</strong>
            <p className="text-sm text-gray-600 font-mono">{config.anonKey}</p>
          </div>
          <div>
            <strong>현재 URL:</strong>
            <p className="text-sm text-gray-600 font-mono">{config.currentUrl}</p>
          </div>
          <div>
            <strong>Origin:</strong>
            <p className="text-sm text-gray-600 font-mono">{config.origin}</p>
          </div>
          <div>
            <strong>리다이렉트 URL:</strong>
            <p className="text-sm text-gray-600 font-mono">{config.redirectUrl}</p>
          </div>
          <div>
            <strong>세션 상태:</strong>
            <p className="text-sm text-gray-600">{config.hasSession ? '로그인됨' : '로그인 안됨'}</p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Supabase 설정 방법:</h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Supabase 대시보드 → Authentication → URL Configuration</li>
          <li>2. Site URL에 현재 도메인 추가</li>
          <li>3. Redirect URLs에 위의 리다이렉트 URL 추가</li>
          <li>4. Google OAuth 설정에서 동일한 URL 추가</li>
        </ol>
      </div>
    </div>
  )
}

