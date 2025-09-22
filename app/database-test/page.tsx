'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>('연결 확인 중...')
  const [tables, setTables] = useState<{table_name: string}[]>([])

  useEffect(() => {
    // 데이터베이스 연결 테스트
    const testConnection = async () => {
      try {
        // 간단한 쿼리로 연결 테스트
        const { data, error } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .limit(5)

        if (error) {
          console.error('Supabase 연결 오류:', error)
          setConnectionStatus('❌ 연결 실패: ' + error.message)
        } else {
          setConnectionStatus('✅ Supabase 데이터베이스 연결 성공!')
          setTables(data || [])
        }
      } catch (err) {
        console.error('연결 테스트 중 오류:', err)
        setConnectionStatus('❌ 연결 오류: ' + (err as Error).message)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Supabase 데이터베이스 연결 테스트</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">연결 상태</h2>
        <p className="text-lg">{connectionStatus}</p>
      </div>

      {tables.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">데이터베이스 테이블 목록</h2>
          <div className="space-y-2">
            {tables.map((table, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <span className="font-mono text-sm">{table.table_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">연결 정보</h3>
        <p className="text-sm text-blue-700">
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </p>
        <p className="text-sm text-blue-700">
          API Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
        </p>
      </div>
    </div>
  )
}
