'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SinglePayment from '@/components/SinglePayment'
import SubscriptionPayment from '@/components/SubscriptionPayment'
import TossPaymentsScript from '@/components/TossPaymentsScript'
import { Star, Crown, Zap, Users, Film, CreditCard } from 'lucide-react'

export default function PremiumPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'vip'>('premium')
  const [showPayment, setShowPayment] = useState(false)

  const plans = {
    basic: {
      name: '베이직',
      price: 5000,
      period: 'monthly',
      features: [
        '무제한 영화 검색',
        '개인 영화 컬렉션',
        '기본 평점 시스템',
        '영화 추천 기능'
      ],
      icon: Film,
      color: 'from-blue-500 to-blue-600'
    },
    premium: {
      name: '프리미엄',
      price: 15000,
      period: 'monthly',
      features: [
        '베이직 모든 기능',
        '고급 영화 분석',
        '개인화된 추천',
        '무제한 리뷰 작성',
        '우선 고객 지원'
      ],
      icon: Crown,
      color: 'from-purple-500 to-purple-600'
    },
    vip: {
      name: 'VIP',
      price: 50000,
      period: 'monthly',
      features: [
        '프리미엄 모든 기능',
        '독점 영화 콘텐츠',
        '1:1 영화 상담',
        '조기 영화 정보',
        'VIP 전용 이벤트'
      ],
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    }
  }

  const handleSelectPlan = (plan: 'basic' | 'premium' | 'vip') => {
    setSelectedPlan(plan)
    setShowPayment(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">로그인이 필요합니다</h2>
          <p className="text-gray-300 mb-6">프리미엄 서비스를 이용하려면 로그인해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
      {/* 토스페이먼츠 SDK 스크립트 로드 */}
      <TossPaymentsScript />
      
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            MOVEA 프리미엄
          </h1>
          <p className="text-xl text-gray-300 mb-8">더 많은 영화와 특별한 경험을 만나보세요</p>
          
          {/* 통계 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-300">활성 사용자</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <Film className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">50,000+</div>
              <div className="text-gray-300">영화 데이터베이스</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">서비스 가동률</div>
            </div>
          </div>
        </div>

        {!showPayment ? (
          <>
            {/* 요금제 선택 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {Object.entries(plans).map(([key, plan]) => {
                const Icon = plan.icon
                const isSelected = selectedPlan === key
                
                return (
                  <div
                    key={key}
                    className={`relative p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'scale-105 shadow-2xl' 
                        : 'hover:scale-102'
                    }`}
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                        : 'rgba(255,255,255,0.05)',
                      border: isSelected 
                        ? '2px solid rgba(255,255,255,0.3)'
                        : '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onClick={() => setSelectedPlan(key as 'basic' | 'premium' | 'vip')}
                  >
                    {/* 인기 배지 */}
                    {key === 'premium' && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          가장 인기
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r ${plan.color}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-white">{plan.price.toLocaleString()}</span>
                        <span className="text-gray-300">원/월</span>
                      </div>
                      
                      <ul className="space-y-3 mb-8 text-left">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectPlan(key as 'basic' | 'premium' | 'vip')
                        }}
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {isSelected ? '선택됨' : '선택하기'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 결제하기 버튼 */}
            <div className="text-center">
              <button
                onClick={() => setShowPayment(true)}
                className="px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 mx-auto hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)', 
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
                }}
              >
                <CreditCard className="w-6 h-6" />
                {plans[selectedPlan].name} 플랜으로 시작하기
              </button>
            </div>

            {/* 추가 정보 */}
            <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">왜 MOVEA 프리미엄인가요?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">🎬 무제한 영화 탐색</h4>
                  <p className="text-gray-300 leading-relaxed">
                    전 세계 수만 편의 영화 데이터베이스에서 원하는 영화를 찾아보세요. 
                    장르, 연도, 평점별로 필터링하여 완벽한 영화를 발견할 수 있습니다.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">⭐ 개인화된 추천</h4>
                  <p className="text-gray-300 leading-relaxed">
                    AI 기반 추천 시스템이 당신의 취향을 분석하여 맞춤형 영화를 추천합니다. 
                    새로운 장르와 감독을 발견하는 특별한 경험을 제공합니다.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">📊 상세한 분석</h4>
                  <p className="text-gray-300 leading-relaxed">
                    영화의 모든 정보를 한눈에 확인하고, 상세한 분석과 통계를 통해 
                    영화에 대한 깊이 있는 이해를 얻을 수 있습니다.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">👥 커뮤니티</h4>
                  <p className="text-gray-300 leading-relaxed">
                    같은 영화를 좋아하는 사람들과 소통하고, 리뷰를 공유하며 
                    영화에 대한 다양한 관점을 나눌 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* 결제 화면 */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {plans[selectedPlan].name} 플랜 결제
                </h2>
                <p className="text-gray-300">
                  월 {plans[selectedPlan].price.toLocaleString()}원으로 모든 기능을 이용하세요
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-white mb-3">포함된 기능</h3>
                <ul className="space-y-2">
                  {plans[selectedPlan].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 단건결제 */}
            <SinglePayment
              amount={plans[selectedPlan].price}
              orderName={`MOVEA ${plans[selectedPlan].name} 플랜`}
              onSuccess={(data) => {
                console.log('결제 성공:', data)
                alert(`${plans[selectedPlan].name} 플랜 결제가 완료되었습니다!`)
                setShowPayment(false)
              }}
              onFail={(error) => {
                console.error('결제 실패:', error)
                alert('결제에 실패했습니다. 다시 시도해주세요.')
              }}
            />

            {/* 뒤로가기 버튼 */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowPayment(false)}
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                요금제 선택으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

