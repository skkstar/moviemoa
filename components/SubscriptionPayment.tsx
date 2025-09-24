'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { payment } from '@/lib/supabase'
import { 
  TOSS_CONFIG, 
  generateCustomerKey,
  TossPaymentsAPI,
  CardBillingKeyRequest,
  BillingApproveRequest
} from '@/lib/toss'

interface SubscriptionPaymentProps {
  amount: number
  orderName: string
  billingCycle: 'monthly' | 'yearly'
  onSuccess?: (billingData: any) => void
  onFail?: (error: any) => void
  className?: string
}

export default function SubscriptionPayment({
  amount,
  orderName,
  billingCycle,
  onSuccess,
  onFail,
  className = ''
}: SubscriptionPaymentProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'register' | 'confirm' | 'complete'>('register')
  const [billingKey, setBillingKey] = useState<string>('')
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryYear: '',
    expiryMonth: '',
    identityNumber: '',
    cardPassword: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  })

  useEffect(() => {
    if (user) {
      setCardInfo(prev => ({
        ...prev,
        customerName: user.user_metadata?.full_name || '',
        customerEmail: user.email || '',
        customerPhone: user.user_metadata?.phone_number || ''
      }))
    }
  }, [user])

  const handleCardRegistration = async () => {
    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    // 입력값 검증
    if (!cardInfo.cardNumber || !cardInfo.expiryYear || !cardInfo.expiryMonth || !cardInfo.identityNumber) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }

    try {
      setLoading(true)

      const customerKey = generateCustomerKey(user.id)

      // 카드 빌링키 발급 요청
      const billingRequest: CardBillingKeyRequest = {
        customerKey,
        cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
        cardExpirationYear: cardInfo.expiryYear,
        cardExpirationMonth: cardInfo.expiryMonth,
        customerIdentityNumber: cardInfo.identityNumber,
        cardPassword: cardInfo.cardPassword || undefined,
        customerName: cardInfo.customerName,
        customerEmail: cardInfo.customerEmail,
        customerMobilePhone: cardInfo.customerPhone,
      }

      const billingResponse = await TossPaymentsAPI.createCardBillingKey(billingRequest)
      
      setBillingKey(billingResponse.billingKey)
      setStep('confirm')

      // Supabase에 빌링키 저장
      await payment.savePaymentMethod({
        user_id: user.id,
        method_type: 'card',
        method_name: `${billingResponse.card?.cardType || '카드'} ${billingResponse.card?.number || ''}`,
        is_default: true,
        method_data: {
          billingKey: billingResponse.billingKey,
          customerKey: customerKey,
          cardInfo: billingResponse.card,
          authenticatedAt: billingResponse.authenticatedAt
        }
      })

    } catch (error) {
      console.error('카드 등록 오류:', error)
      alert('카드 등록에 실패했습니다. 카드 정보를 확인해주세요.')
      onFail?.(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionPayment = async () => {
    if (!user || !billingKey) {
      alert('빌링키가 없습니다.')
      return
    }

    try {
      setLoading(true)

      const customerKey = generateCustomerKey(user.id)
      const orderId = `subscription_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // 주문 생성
      const { data: order, error: orderError } = await payment.createOrder({
        user_id: user.id,
        total_amount: amount,
        customer_name: cardInfo.customerName,
        customer_email: cardInfo.customerEmail,
        customer_phone: cardInfo.customerPhone,
        order_items: [
          {
            name: orderName,
            price: amount,
            quantity: 1,
            billingCycle: billingCycle
          }
        ],
        currency: TOSS_CONFIG.currency,
        status: 'pending'
      })

      if (orderError || !order) {
        throw new Error('주문 생성에 실패했습니다.')
      }

      // 자동결제 승인 요청
      const approveRequest: BillingApproveRequest = {
        customerKey,
        orderId: orderId,
        orderName: orderName,
        amount: amount,
        customerEmail: cardInfo.customerEmail,
        customerName: cardInfo.customerName,
        customerMobilePhone: cardInfo.customerPhone,
      }

      const paymentResponse = await TossPaymentsAPI.approveCardBilling(billingKey, approveRequest)

      // 결제 정보 저장
      await payment.createPayment({
        order_id: order.id,
        payment_key: paymentResponse.paymentKey,
        order_id_toss: orderId,
        amount: amount,
        status: 'paid',
        method: 'card',
        approved_at: paymentResponse.approvedAt,
        receipt_url: paymentResponse.receipt?.url,
        toss_response: paymentResponse
      })

      // 주문 상태 업데이트
      await payment.updateOrderStatus(order.id, 'paid')

      setStep('complete')
      onSuccess?.(paymentResponse)

    } catch (error) {
      console.error('정기결제 오류:', error)
      alert('정기결제에 실패했습니다.')
      onFail?.(error)
    } finally {
      setLoading(false)
    }
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 2)
  }

  const formatIdentityNumber = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 6)
  }

  if (!user) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-600">정기결제를 위해 로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 정기결제 정보 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">정기결제 정보</h3>
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
          <div className="flex justify-between">
            <span className="text-gray-600">결제 주기</span>
            <span className="font-medium">
              {billingCycle === 'monthly' ? '매월' : '매년'}
            </span>
          </div>
        </div>
      </div>

      {/* 카드 등록 단계 */}
      {step === 'register' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카드 정보 등록</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카드번호 *
              </label>
              <input
                type="text"
                value={cardInfo.cardNumber}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  cardNumber: formatCardNumber(e.target.value)
                }))}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  유효년도 *
                </label>
                <input
                  type="text"
                  value={cardInfo.expiryYear}
                  onChange={(e) => setCardInfo(prev => ({
                    ...prev,
                    expiryYear: e.target.value
                  }))}
                  placeholder="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  유효월 *
                </label>
                <input
                  type="text"
                  value={cardInfo.expiryMonth}
                  onChange={(e) => setCardInfo(prev => ({
                    ...prev,
                    expiryMonth: formatExpiryDate(e.target.value)
                  }))}
                  placeholder="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                생년월일 (YYMMDD) *
              </label>
              <input
                type="text"
                value={cardInfo.identityNumber}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  identityNumber: formatIdentityNumber(e.target.value)
                }))}
                placeholder="901201"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카드 비밀번호 앞 2자리
              </label>
              <input
                type="password"
                value={cardInfo.cardPassword}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  cardPassword: e.target.value.replace(/\D/g, '').substring(0, 2)
                }))}
                placeholder="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                고객명
              </label>
              <input
                type="text"
                value={cardInfo.customerName}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  customerName: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={cardInfo.customerEmail}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  customerEmail: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                value={cardInfo.customerPhone}
                onChange={(e) => setCardInfo(prev => ({
                  ...prev,
                  customerPhone: e.target.value
                }))}
                placeholder="010-1234-5678"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCardRegistration}
            disabled={loading}
            className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                카드 등록 중...
              </div>
            ) : (
              '카드 등록하기'
            )}
          </button>
        </div>
      )}

      {/* 결제 확인 단계 */}
      {step === 'confirm' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">정기결제 확인</h3>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    카드가 성공적으로 등록되었습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">상품명</span>
                <span className="font-medium">{orderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 금액</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat('ko-KR', {
                    style: 'currency',
                    currency: 'KRW'
                  }).format(amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 주기</span>
                <span className="font-medium">
                  {billingCycle === 'monthly' ? '매월' : '매년'}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>• 정기결제는 등록된 카드로 자동으로 결제됩니다.</p>
              <p>• 언제든지 구독을 취소할 수 있습니다.</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setStep('register')}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleSubscriptionPayment}
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:scale-105'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  결제 중...
                </div>
              ) : (
                '정기결제 시작하기'
              )}
            </button>
          </div>
        </div>
      )}

      {/* 완료 단계 */}
      {step === 'complete' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">정기결제가 완료되었습니다!</h3>
            <p className="text-gray-600 mb-4">
              {orderName} 정기결제가 성공적으로 설정되었습니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-600">
                <p>• 결제 주기: {billingCycle === 'monthly' ? '매월' : '매년'}</p>
                <p>• 결제 금액: {new Intl.NumberFormat('ko-KR', {
                  style: 'currency',
                  currency: 'KRW'
                }).format(amount)}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/payments'}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              결제 내역 보기
            </button>
          </div>
        </div>
      )}

      {/* 안내 메시지 */}
      <div className="text-sm text-gray-500 text-center">
        <p>• 테스트 환경에서는 실제 결제가 되지 않습니다.</p>
        <p>• 카드 정보는 안전하게 암호화되어 저장됩니다.</p>
      </div>
    </div>
  )
}
