'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SinglePayment from '@/components/SinglePayment'
import SubscriptionPayment from '@/components/SubscriptionPayment'
import TossPaymentsScript from '@/components/TossPaymentsScript'

export default function PaymentIntegrationTestPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'single' | 'subscription'>('single')
  const [testAmount, setTestAmount] = useState(10000)
  const [testOrderName, setTestOrderName] = useState('테스트 상품')

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
      {/* 토스페이먼츠 SDK 스크립트 로드 */}
      <TossPaymentsScript />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">토스페이먼츠 API 개별 연동 테스트</h1>
          <p className="mt-2 text-gray-600">단건결제와 정기결제를 테스트할 수 있습니다.</p>
        </div>

        {/* 테스트 설정 */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">테스트 설정</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                결제 금액
              </label>
              <input
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상품명
              </label>
              <input
                type="text"
                value={testOrderName}
                onChange={(e) => setTestOrderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('single')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'single'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              단건결제 (API 개별 연동)
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subscription'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              정기결제 (API 개별 연동)
            </button>
          </nav>
        </div>

        {/* 단건결제 탭 */}
        {activeTab === 'single' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    API 개별 연동 방식
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>• 토스페이먼츠 SDK의 payment.requestPayment() 메서드 사용</p>
                    <p>• 통합결제창이 열리며 카드, 간편결제 등 다양한 결제수단 지원</p>
                    <p>• 결제 승인은 서버에서 결제 승인 API 호출</p>
                  </div>
                </div>
              </div>
            </div>

            <SinglePayment
              amount={testAmount}
              orderName={testOrderName}
              onSuccess={(data) => {
                console.log('단건결제 성공:', data)
                alert('단건결제가 성공적으로 완료되었습니다!')
              }}
              onFail={(error) => {
                console.error('단건결제 실패:', error)
                alert('단건결제에 실패했습니다.')
              }}
            />
          </div>
        )}

        {/* 정기결제 탭 */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    API 개별 연동 방식 (정기결제)
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>• 카드 정보를 직접 입력받아 빌링키 발급</p>
                    <p>• 빌링키로 자동결제 승인 API 호출</p>
                    <p>• 정기 구독 서비스에 적합한 결제 방식</p>
                  </div>
                </div>
              </div>
            </div>

            <SubscriptionPayment
              amount={testAmount}
              orderName={testOrderName}
              billingCycle="monthly"
              onSuccess={(data) => {
                console.log('정기결제 성공:', data)
                alert('정기결제가 성공적으로 설정되었습니다!')
              }}
              onFail={(error) => {
                console.error('정기결제 실패:', error)
                alert('정기결제 설정에 실패했습니다.')
              }}
            />
          </div>
        )}

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

        {/* 테스트 안내 */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">테스트 안내</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>• 테스트 환경에서는 실제 결제가 되지 않습니다.</p>
            <p>• 테스트 카드 번호: 4242 4242 4242 4242</p>
            <p>• 유효기간: 12/25, CVC: 123, 생년월일: 901201</p>
            <p>• 모든 결제 정보는 Supabase에 저장됩니다.</p>
            <p>• 결제 내역은 /payments 페이지에서 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

