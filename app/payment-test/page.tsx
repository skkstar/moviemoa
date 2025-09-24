'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { payment } from '@/lib/supabase'

export default function PaymentTestPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState({
    total_amount: 10000,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    order_items: [
      {
        name: '테스트 상품',
        price: 10000,
        quantity: 1
      }
    ]
  })

  const handleCreateOrder = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!orderData.customer_name || !orderData.customer_email) {
      alert('고객 정보를 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      
      const { data, error } = await payment.createOrder({
        user_id: user.id,
        total_amount: orderData.total_amount,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone || null,
        order_items: orderData.order_items,
        currency: 'KRW'
      })

      if (error) {
        console.error('주문 생성 오류:', error)
        alert('주문 생성에 실패했습니다.')
      } else {
        alert(`주문이 생성되었습니다!\n주문번호: ${data?.order_number}`)
        console.log('생성된 주문:', data)
      }
    } catch (error) {
      console.error('주문 생성 중 오류:', error)
      alert('주문 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePayment = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      setLoading(true)
      
      // 먼저 주문을 생성
      const { data: order, error: orderError } = await payment.createOrder({
        user_id: user.id,
        total_amount: orderData.total_amount,
        customer_name: orderData.customer_name || '테스트 고객',
        customer_email: orderData.customer_email || 'test@example.com',
        customer_phone: orderData.customer_phone || null,
        order_items: orderData.order_items,
        currency: 'KRW'
      })

      if (orderError || !order) {
        alert('주문 생성에 실패했습니다.')
        return
      }

      // 결제 정보 생성 (토스페이먼츠 연동 시 실제 paymentKey 사용)
      const { data: paymentData, error: paymentError } = await payment.createPayment({
        order_id: order.id,
        payment_key: `test_payment_${Date.now()}`, // 실제로는 토스페이먼츠에서 받은 값
        order_id_toss: `test_order_${Date.now()}`, // 실제로는 토스페이먼츠에서 받은 값
        amount: orderData.total_amount,
        status: 'ready',
        method: 'card',
        currency: 'KRW',
        toss_response: {
          // 토스페이먼츠 응답 데이터 예시
          paymentKey: `test_payment_${Date.now()}`,
          orderId: `test_order_${Date.now()}`,
          status: 'READY',
          amount: orderData.total_amount
        }
      })

      if (paymentError) {
        console.error('결제 생성 오류:', paymentError)
        alert('결제 생성에 실패했습니다.')
      } else {
        alert(`결제가 준비되었습니다!\n결제키: ${paymentData?.payment_key}`)
        console.log('생성된 결제:', paymentData)
      }
    } catch (error) {
      console.error('결제 생성 중 오류:', error)
      alert('결제 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <p className="text-gray-600">결제 테스트를 위해 로그인해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">결제 테스트</h1>
          <p className="mt-2 text-gray-600">Supabase와 토스페이먼츠 연동을 위한 테스트 페이지입니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 주문 정보 입력 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">주문 정보</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  총 금액
                </label>
                <input
                  type="number"
                  value={orderData.total_amount}
                  onChange={(e) => setOrderData({
                    ...orderData,
                    total_amount: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  고객명 *
                </label>
                <input
                  type="text"
                  value={orderData.customer_name}
                  onChange={(e) => setOrderData({
                    ...orderData,
                    customer_name: e.target.value
                  })}
                  placeholder="홍길동"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={orderData.customer_email}
                  onChange={(e) => setOrderData({
                    ...orderData,
                    customer_email: e.target.value
                  })}
                  placeholder="example@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호
                </label>
                <input
                  type="tel"
                  value={orderData.customer_phone}
                  onChange={(e) => setOrderData({
                    ...orderData,
                    customer_phone: e.target.value
                  })}
                  placeholder="010-1234-5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 테스트 버튼들 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">테스트 액션</h2>
            
            <div className="space-y-4">
              <button
                onClick={handleCreateOrder}
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '처리 중...' : '주문 생성 테스트'}
              </button>

              <button
                onClick={handleCreatePayment}
                disabled={loading}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '처리 중...' : '주문 + 결제 생성 테스트'}
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">테스트 정보</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• 주문 생성: Supabase orders 테이블에 데이터 저장</p>
                  <p>• 결제 생성: Supabase payments 테이블에 데이터 저장</p>
                  <p>• RLS 정책으로 사용자별 데이터 격리</p>
                  <p>• 자동 주문번호 생성 (YYYYMMDD-XXXXXX)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 현재 사용자 정보 */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">현재 사용자 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">사용자 ID:</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">이메일:</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">이름:</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                {user.user_metadata?.full_name || '없음'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">가입일:</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                {new Date(user.created_at).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
