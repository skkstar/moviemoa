'use client'

import { useState } from 'react'
import SourceNavigation from '../../components/variations/source'
import Design1Navigation from '../../components/variations/design1'
import Design2Navigation from '../../components/variations/design2'
import Design3Navigation from '../../components/variations/design3'

const VariationsPage = () => {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null)

  const variations = [
    {
      id: 'source',
      name: 'Original Design',
      description: '현재 사용 중인 원본 디자인 - 그라디언트와 블러 효과가 있는 다크 테마',
      component: SourceNavigation,
      features: ['다크 테마', '그라디언트 로고', '블러 배경', '호버 애니메이션']
    },
    {
      id: 'design1',
      name: 'Minimal Modern',
      description: '깔끔하고 미니멀한 라이트 테마 - 현대적이고 깨끗한 디자인',
      component: Design1Navigation,
      features: ['라이트 테마', '미니멀 디자인', '부드러운 색상', '깔끔한 타이포그래피']
    },
    {
      id: 'design2',
      name: 'Dark Professional',
      description: '전문적이고 세련된 다크 테마 - 비즈니스 환경에 적합한 디자인',
      component: Design2Navigation,
      features: ['다크 테마', '전문적 디자인', '블루 계열 색상', '고급스러운 느낌']
    },
    {
      id: 'design3',
      name: 'Vibrant Gradient',
      description: '화려한 그라디언트와 애니메이션 - 에너지 넘치는 크리에이티브 디자인',
      component: Design3Navigation,
      features: ['화려한 그라디언트', '애니메이션 효과', '다채로운 색상', '인터랙티브 요소']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Navigation Design Variations
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            MOVEA 서비스를 위한 4가지 네비게이션 디자인 변형을 비교해보세요
          </p>
          
          {/* 변형 선택 버튼 */}
          <div className="flex flex-wrap gap-3">
            {variations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setSelectedVariation(selectedVariation === variation.id ? null : variation.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedVariation === variation.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {variation.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 개별 변형 보기 */}
        {selectedVariation && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {variations.find(v => v.id === selectedVariation)?.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {variations.find(v => v.id === selectedVariation)?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variations.find(v => v.id === selectedVariation)?.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-0">
                {(() => {
                  const variation = variations.find(v => v.id === selectedVariation)
                  const Component = variation?.component
                  return Component ? <Component /> : null
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 전체 비교 */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              전체 디자인 비교
            </h2>
            <p className="text-gray-600">
              모든 변형을 한 번에 비교하고 각각의 특징을 확인해보세요
            </p>
          </div>

          {variations.map((variation, index) => (
            <div key={variation.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {variation.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {variation.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {variation.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">디자인 #{index + 1}</div>
                    <button
                      onClick={() => setSelectedVariation(variation.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      전체 보기
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <variation.component />
              </div>
            </div>
          ))}
        </div>

        {/* 사용 가이드 */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            사용 가이드
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                어떻게 사용하나요?
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 원하는 디자인 변형을 선택하세요</li>
                <li>• 해당 컴포넌트를 프로젝트에 import하세요</li>
                <li>• CSS 모듈이 자동으로 적용됩니다</li>
                <li>• 모든 기능이 동일하게 작동합니다</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                코드 예시
              </h4>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`import Design1Navigation from '@/components/variations/design1'

// 사용법
<Design1Navigation 
  className="custom-class"
  style={{ marginTop: '20px' }}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 특징 비교 테이블 */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-900">
              특징 비교표
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    특징
                  </th>
                  {variations.map((variation) => (
                    <th key={variation.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      {variation.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">테마</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">다크</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">라이트</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">다크</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">그라디언트</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">애니메이션</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">기본</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">부드러운</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">전문적</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">화려한</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">색상 팔레트</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">핑크/퍼플</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">블루/그레이</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">블루/다크</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">무지개</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">사용 권장</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">현재 서비스</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">일반 사이트</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">비즈니스</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">크리에이티브</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariationsPage
