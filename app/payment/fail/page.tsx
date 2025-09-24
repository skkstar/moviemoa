'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function PaymentFailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [errorInfo, setErrorInfo] = useState<{
    code: string
    message: string
    orderId?: string
  } | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const message = searchParams.get('message')
    const orderId = searchParams.get('orderId')

    if (code && message) {
      setErrorInfo({
        code,
        message,
        orderId: orderId || undefined
      })
    }
  }, [searchParams])

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '결제가 취소되었습니다.'
      case 'PAY_PROCESS_ABORTED':
        return '결제가 중단되었습니다.'
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.'
      case 'NOT_FOUND_PAYMENT_SESSION':
        return '결제 세션이 만료되었습니다.'
      case 'FORBIDDEN_REQUEST':
        return '잘못된 결제 요청입니다.'
      case 'UNAUTHORIZED_KEY':
        return '인증되지 않은 키입니다.'
      default:
        return '결제 중 오류가 발생했습니다.'
    }
  }

  const getErrorDescription = (code: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '구매자가 결제를 취소했습니다. 다시 시도해주세요.'
      case 'PAY_PROCESS_ABORTED':
        return '결제 과정에서 오류가 발생했습니다. 카드 정보를 확인해주세요.'
      case 'REJECT_CARD_COMPANY':
        return '카드 한도 초과, 비밀번호 오류, 포인트 부족 등의 이유로 결제가 거절되었습니다.'
      case 'NOT_FOUND_PAYMENT_SESSION':
        return '결제 요청 후 10분이 지나 결제 세션이 만료되었습니다.'
      case 'FORBIDDEN_REQUEST':
        return '결제 요청 정보가 올바르지 않습니다.'
      case 'UNAUTHORIZED_KEY':
        return 'API 키가 올바르지 않습니다.'
      default:
        return '알 수 없는 오류가 발생했습니다. 고객센터로 문의해주세요.'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제에 실패했습니다</h2>
          
          {errorInfo && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
              <h3 className="font-medium text-red-900 mb-2">오류 정보</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-600">오류 코드</span>
                  <span className="font-medium text-red-900">{errorInfo.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">오류 메시지</span>
                  <span className="font-medium text-red-900">{getErrorMessage(errorInfo.code)}</span>
                </div>
                {errorInfo.orderId && (
                  <div className="flex justify-between">
                    <span className="text-red-600">주문번호</span>
                    <span className="font-medium text-red-900">{errorInfo.orderId}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-red-700 mt-2">
                {getErrorDescription(errorInfo.code)}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => router.back()}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              다시 결제하기
            </button>
            <button
              onClick={() => router.push('/payments')}
              className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              결제 내역 보기
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              홈으로 이동
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>문제가 지속되면 고객센터로 문의해주세요.</p>
            <p>고객센터: 1544-7772</p>
          </div>
        </div>
      </div>
    </div>
  )
}
