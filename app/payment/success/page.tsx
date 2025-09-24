'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { payment } from '@/lib/supabase'
import { TossPaymentsAPI } from '@/lib/toss'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const paymentKey = searchParams.get('paymentKey')
        const orderId = searchParams.get('orderId')
        const amount = searchParams.get('amount')
        const paymentType = searchParams.get('paymentType')

        if (!paymentKey || !orderId || !amount) {
          throw new Error('결제 정보가 올바르지 않습니다.')
        }

        // 토스페이먼츠 결제 승인
        const tossResponse = await TossPaymentsAPI.confirmPayment(
          paymentKey,
          orderId,
          parseInt(amount)
        )

        if (tossResponse.status !== 'DONE') {
          throw new Error('결제 승인에 실패했습니다.')
        }

        // Supabase에서 주문 찾기
        const { data: orders, error: orderError } = await payment.getUserOrders(user?.id || '')
        if (orderError) {
          throw new Error('주문 정보를 찾을 수 없습니다.')
        }

        const order = orders?.find(o => o.order_number === orderId)
        if (!order) {
          throw new Error('주문을 찾을 수 없습니다.')
        }

        // 결제 정보 저장
        const { error: paymentError } = await payment.createPayment({
          order_id: order.id,
          payment_key: paymentKey,
          order_id_toss: orderId,
          amount: parseInt(amount),
          status: 'paid',
          method: tossResponse.method,
          approved_at: tossResponse.approvedAt,
          receipt_url: tossResponse.receipt?.url,
          toss_response: tossResponse
        })

        if (paymentError) {
          console.error('결제 정보 저장 오류:', paymentError)
        }

        // 주문 상태 업데이트
        await payment.updateOrderStatus(order.id, 'paid')

        setPaymentData(tossResponse)
        setLoading(false)

      } catch (error) {
        console.error('결제 승인 오류:', error)
        setError(error instanceof Error ? error.message : '결제 승인 중 오류가 발생했습니다.')
        setLoading(false)
      }
    }

    if (user) {
      handlePaymentSuccess()
    }
  }, [searchParams, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">결제 승인 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제 승인 실패</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/payments')}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            결제 내역으로 이동
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">결제가 완료되었습니다!</h2>
          <p className="text-gray-600 mb-4">결제가 성공적으로 처리되었습니다.</p>
          
          {paymentData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
              <h3 className="font-medium text-gray-900 mb-2">결제 정보</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문번호</span>
                  <span className="font-medium">{paymentData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제금액</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('ko-KR', {
                      style: 'currency',
                      currency: 'KRW'
                    }).format(paymentData.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제수단</span>
                  <span className="font-medium">{paymentData.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">승인시간</span>
                  <span className="font-medium">
                    {new Date(paymentData.approvedAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => router.push('/payments')}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-blue-600"></div>
          <div className="text-xl text-gray-600">결제 정보를 불러오는 중...</div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
