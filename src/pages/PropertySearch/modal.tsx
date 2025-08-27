import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  score: number;
  scoreText: string;
  image: string;
  businessTypes: string[];
  suitableBusinesses: { name: string; percentage: number }[];
  keyFactors: string[];
}

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyDetailModal({ isOpen, onClose, property }: PropertyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !property) return null;

  const handleAIAnalysisClick = () => {
    console.log('Navigate to AI chat');
  };

  const handleCustomMatchingClick = () => {
    console.log('Navigate to chatbot for custom matching');
  };

  // 활용 방안 제안 (keyFactors 기반)
  // TODO: API 추가 후 삭제
  const getUsageProposal = (keyFactors: string[]) => {
    const factors = keyFactors.join(' ');

    if (factors.includes('저녁피크') && factors.includes('40대배후')) {
      return '단골 확보형 전략(정찰가·세트 메뉴)으로 안정적 매출이 가능합니다.';
    } else if (factors.includes('학교') && factors.includes('20대배후')) {
      return '등하교·퇴근 시간대 맞춤형 상품 구성으로 유동을 흡수할 수 있습니다.';
    } else if (factors.includes('정류장') && factors.includes('심야배달')) {
      return '배달·포장 전략을 병행해 교통 약점을 보완할 수 있습니다.';
    } else if (factors.includes('직장배후') && factors.includes('점심피크')) {
      return '점심 시간대 집중 운영으로 고효율 매출 구조를 만들 수 있습니다.';
    } else if (factors.includes('외국인수요') && factors.includes('주말피크')) {
      return '차별화된 메뉴·서비스로 관광객 수요를 선점할 수 있습니다.';
    } else if (factors.includes('대학가') && factors.includes('배달수요')) {
      return '배달 중심 운영으로 학생층 수요를 안정적으로 확보할 수 있습니다.';
    }

    return '유입 수요가 높아 초기 마케팅만 집중해도 빠른 자리 잡기가 가능합니다.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                property.score >= 90
                  ? 'bg-green-100 text-green-700'
                  : property.score >= 85
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              {property.score}점
            </div>
            <h2 className="text-xl font-bold text-gray-900">{property.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`border-b-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            매물 정보
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`border-b-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'ai'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            AI 분석 요약
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          {activeTab === 'info' ? (
            // 매물 정보 탭
            <div className="space-y-6">
              {/* 매물 이미지 */}
              <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
                <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
              </div>

              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">공간 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">사업장 소재지</span>
                      <span className="font-medium text-gray-900">{property.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">건물 종류</span>
                      <span className="font-medium text-gray-900">근린상가</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">전용면적</span>
                      <span className="font-medium text-gray-900">47㎡</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">공급면적</span>
                      <span className="font-medium text-gray-900">52㎡</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">층수</span>
                      <span className="font-medium text-gray-900">지상 1층</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">임대 조건</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">보증금</span>
                      <span className="font-medium text-gray-900">2,000만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">임대료</span>
                      <span className="font-medium text-red-600">월 200만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">관리비</span>
                      <span className="font-medium text-gray-900">월 15만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">업종 제한</span>
                      <span className="font-medium text-gray-900">음식업 가능</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 연락처 정보 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">연락처 정보</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-1 text-sm text-gray-600">담당자명</div>
                    <div className="font-medium">김부동산</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-1 text-sm text-gray-600">연락처</div>
                    <div className="font-medium text-blue-600">010-1234-5678</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-1 text-sm text-gray-600">등록일</div>
                    <div className="font-medium">2024.12.15</div>
                  </div>
                </div>
              </div>

              {/* 매물 사진 (추가) */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">매물 사진</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img src={property.image} alt={`매물사진 ${i}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // AI 분석 요약 탭
            <div className="space-y-6">
              {/* 창업 적합도 */}
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">창업 적합도</h3>
                  <div
                    className={`rounded-full px-4 py-2 text-lg font-bold ${
                      property.score >= 90
                        ? 'bg-green-100 text-green-700'
                        : property.score >= 85
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {property.score}점 ({property.scoreText})
                  </div>
                </div>
              </div>

              {/* Top3 추천 업종 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Top3 추천 업종</h3>
                <div className="space-y-3">
                  {property.suitableBusinesses.slice(0, 3).map((business, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{business.name}</span>
                        <span className="text-sm font-medium text-blue-600">({business.percentage}점)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {index === 0 && '저녁 피크+40대 배후'}
                        {index === 1 && '유동인구 집중도 높음'}
                        {index === 2 && '경쟁 밀도 적정 수준'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 활용 방안 한 줄 제안 */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <h4 className="mb-2 flex items-center font-semibold text-gray-900">
                  <svg className="mr-2 h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  활용 방안 제안
                </h4>
                <p className="text-sm text-gray-700">{getUsageProposal(property.keyFactors)}</p>
              </div>

              {/* 임대료 포지셔닝 */}
              <div className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-3 font-semibold text-gray-900">임대료 포지셔닝</h4>
                <div className="mb-2">
                  <span className="text-lg font-bold text-red-600">㎡당 4.3만원</span>
                  <span className="ml-2 text-sm text-green-600">지역 평균 대비 -12%</span>
                </div>
                <div className="text-sm font-medium text-blue-600">EOCR: 14.2% (보통 구간)</div>
              </div>

              {/* 상권 하이라이트 3개 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">상권 하이라이트</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">경제</span>
                    </div>
                    <span className="text-sm text-gray-600">EOCR 14.2% (보통)</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">수요</span>
                    </div>
                    <span className="text-sm text-gray-600">저녁 유동 1,200명/일 (+18%)</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">환경</span>
                    </div>
                    <span className="text-sm text-gray-600">경쟁: 5개, 적정 대비 0.8배</span>
                  </div>
                </div>
              </div>

              {/* 동작 버튼 */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAIAnalysisClick}
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-black p-3 text-white transition-colors hover:bg-gray-800"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  {/* TODO: pdf viewer or download 기능 추가 */}
                  <span className="text-sm font-medium">AI 분석 리포트 보기</span>
                </button>
                <button
                  onClick={handleCustomMatchingClick}
                  className="flex flex-1 items-center justify-center space-x-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <button onClick={() => navigate('/chatbot')} className="text-sm font-medium text-gray-700">
                    AI 챗봇 연결
                  </button>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
