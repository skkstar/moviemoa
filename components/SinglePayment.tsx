'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { payment } from '@/lib/supabase'
import { 
  TOSS_CONFIG, 
  initializeTossPayment, 
  generateOrderId, 
  generateCustomerKey,
  TossPaymentsAPI
} from '@/lib/toss'

interface SinglePaymentProps {
  amount: number
  orderName: string
  onSuccess?: (paymentData: any) => void
  onFail?: (error: any) => void
  className?: string
}

export default function SinglePayment({
  amount,
  orderName,
  onSuccess,
  onFail,
  className = ''
}: SinglePaymentProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentInstance, setPaymentInstance] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!user) return

    const initializePayment = async () => {
      try {
        // 토스페이먼츠 SDK 로드 확인
        if (typeof window === 'undefined' || !window.TossPayments) {
          console.error('토스페이먼츠 SDK가 로드되지 않았습니다.')
          return
        }

        const customerKey = generateCustomerKey(user.id)
        const paymentInstance = initializeTossPayment(customerKey)
        
        if (!paymentInstance) {
          console.error('토스페이먼츠 결제 인스턴스 초기화 실패')
          return
        }

        setPaymentInstance(paymentInstance)
        setIsReady(true)
      } catch (error) {
        console.error('결제 인스턴스 초기화 오류:', error)
      }
    }

    initializePayment()
  }, [user])

  const handlePayment = async () => {
    if (!user || !paymentInstance || !isReady) {
      alert('결제 준비가 완료되지 않았습니다.')
      return
    }

    try {
      setLoading(true)

      // 주문 생성
      const orderId = generateOrderId()
      const customerKey = generateCustomerKey(user.id)

      const { data: order, error: orderError } = await payment.createOrder({
        user_id: user.id,
        total_amount: amount,
        customer_name: user.user_metadata?.full_name || '고객',
        customer_email: user.email || '',
        order_items: [
          {
            name: orderName,
            price: amount,
            quantity: 1
          }
        ],
        currency: TOSS_CONFIG.currency,
        status: 'pending'
      })

      if (orderError || !order) {
        throw new Error('주문 생성에 실패했습니다.')
      }

      // API 개별 연동 방식으로 결제 요청
      await paymentInstance.requestPayment({
        method: 'CARD', // 카드 결제
        amount: {
          currency: TOSS_CONFIG.currency,
          value: amount,
        },
        orderId: orderId,
        orderName: orderName,
        successUrl: `${TOSS_CONFIG.successUrl}?orderId=${orderId}`,
        failUrl: `${TOSS_CONFIG.failUrl}?orderId=${orderId}`,
        customerEmail: user.email || '',
        customerName: user.user_metadata?.full_name || '고객',
        customerMobilePhone: user.user_metadata?.phone_number || '',
        // 카드 결제에 필요한 정보
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT', // 통합결제창 여는 옵션
          useCardPoint: false,
          useAppCardOnly: false,
        },
      })

    } catch (error) {
      console.error('결제 요청 오류:', error)
      setLoading(false)
      onFail?.(error)
    }
  }

  if (!user) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-600">결제를 위해 로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 결제 정보 요약 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 정보</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">상품명</span>
            <span className="font-medium">{orderName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">결제 금액</span>
            <span className="font-semibold text-lg">
              {new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
              }).format(amount)}
            </span>
          </div>
        </div>
      </div>

      {/* 결제 수단 안내 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 수단</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">카드 결제</p>
              <p className="text-sm text-gray-500">신용카드, 체크카드, 간편결제</p>
            </div>
          </div>
        </div>
      </div>

      {/* 이용약관 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">이용약관</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• 결제 진행 시 토스페이먼츠 이용약관에 동의한 것으로 간주됩니다.</p>
          <p>• 결제 정보는 안전하게 암호화되어 처리됩니다.</p>
          <p>• 테스트 환경에서는 실제 결제가 되지 않습니다.</p>
        </div>
      </div>

      {/* 결제하기 버튼 */}
      <button
        onClick={handlePayment}
        disabled={loading || !isReady}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          loading || !isReady
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            결제 진행 중...
          </div>
        ) : (
          `${new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
          }).format(amount)} 결제하기`
        )}
      </button>

      {/* 안내 메시지 */}
      <div className="text-sm text-gray-500 text-center">
        <p>• 테스트 환경에서는 실제 결제가 되지 않습니다.</p>
        <p>• 결제 과정에서 입력한 정보는 저장되지 않습니다.</p>
      </div>
    </div>
  )
}
