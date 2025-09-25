'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    TossPayments: (clientKey: string) => any
  }
}

export default function TossPaymentsScript() {
  useEffect(() => {
    // 이미 로드되었는지 확인
    if (window.TossPayments) {
      return
    }

    // 토스페이먼츠 SDK 스크립트 로드
    const script = document.createElement('script')
    script.src = 'https://js.tosspayments.com/v2/standard'
    script.async = true
    
    script.onload = () => {
      console.log('토스페이먼츠 SDK가 로드되었습니다.')
    }
    
    script.onerror = () => {
      console.error('토스페이먼츠 SDK 로드에 실패했습니다.')
    }

    document.head.appendChild(script)

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      const existingScript = document.querySelector('script[src="https://js.tosspayments.com/v2/standard"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return null
}

