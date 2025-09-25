'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { payment } from '@/lib/supabase'
import { Database } from '@/lib/supabase'

type Order = Database['public']['Tables']['orders']['Row']
type Payment = Database['public']['Tables']['payments']['Row']
type PaymentMethod = Database['public']['Tables']['payment_methods']['Row']

export default function PaymentsPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<(Order & { payments: Payment[] })[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'orders' | 'methods'>('orders')

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      // 주문 목록과 결제수단 목록을 병렬로 로드
      const [ordersResult, methodsResult] = await Promise.all([
        payment.getUserOrders(user.id),
        payment.getUserPaymentMethods(user.id)
      ])

      if (ordersResult.error) {
        console.error('주문 목록 로드 오류:', ordersResult.error)
      } else {
        setOrders(ordersResult.data || [])
      }

      if (methodsResult.error) {
        console.error('결제수단 목록 로드 오류:', methodsResult.error)
      } else {
        setPaymentMethods(methodsResult.data || [])
      }
    } catch (error) {
      console.error('데이터 로드 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      case 'refunded':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return '결제완료'
      case 'pending':
        return '결제대기'
      case 'cancelled':
        return '취소됨'
      case 'refunded':
        return '환불됨'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
          <p className="text-gray-600">결제 정보를 확인하려면 로그인해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">결제 관리</h1>
          <p className="mt-2 text-gray-600">주문 내역과 결제수단을 관리하세요.</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              주문 내역
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              결제수단
            </button>
          </nav>
        </div>

        {/* 주문 내역 탭 */}
        {activeTab === 'orders' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">주문 내역</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">주문 내역이 없습니다</h3>
                  <p className="text-gray-500">아직 주문한 상품이 없습니다.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              주문번호: {order.order_number}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.created_at!)}
                            </p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            총 금액: <span className="font-medium">{formatCurrency(order.total_amount)}</span>
                          </p>
                          {order.customer_name && (
                            <p className="text-sm text-gray-600">
                              주문자: {order.customer_name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </span>
                        {order.payments && order.payments.length > 0 && (
                          <div className="text-sm text-gray-500">
                            {order.payments.map((payment, index) => (
                              <div key={payment.id}>
                                결제: {formatCurrency(payment.amount)} ({payment.method})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 결제수단 탭 */}
        {activeTab === 'methods' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">저장된 결제수단</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {paymentMethods.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 결제수단이 없습니다</h3>
                  <p className="text-gray-500">결제 시 결제수단을 저장할 수 있습니다.</p>
                </div>
              ) : (
                paymentMethods.map((method) => (
                  <div key={method.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {method.method_type === 'card' && (
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                          )}
                          {method.method_type === 'account' && (
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {method.method_name || `${method.method_type} 결제수단`}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {method.method_type === 'card' && '신용카드'}
                            {method.method_type === 'account' && '계좌이체'}
                            {method.method_type === 'virtual_account' && '가상계좌'}
                            {method.method_type === 'mobile' && '휴대폰 결제'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(method.created_at!)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.is_default && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            기본
                          </span>
                        )}
                        <button
                          onClick={() => {
                            // 기본 결제수단 설정 로직
                            if (method.user_id && !method.is_default) {
                              payment.setDefaultPaymentMethod(method.user_id, method.id)
                                .then(() => loadUserData())
                                .catch(console.error)
                            }
                          }}
                          disabled={method.is_default}
                          className={`px-3 py-1 text-sm rounded-md ${
                            method.is_default
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {method.is_default ? '기본 설정됨' : '기본으로 설정'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

