import { useEffect, useState } from 'react';

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
}

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyDetailModal({ isOpen, onClose, property }: PropertyDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'ai'>('info');

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

  const handlePDFPreview = () => {
    console.log('Open PDF preview');
  };

  const handlePDFDownload = () => {
    console.log('Download PDF');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
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

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`cursor-pointer border-b-2 px-6 py-3 font-medium transition-colors ${
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

        <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
                <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">기본 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">주소</span>
                      <span className="font-medium text-gray-900">{property.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">월세</span>
                      <span className="font-medium text-red-600">{property.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">보증금</span>
                      <span className="font-medium text-gray-900">1,000만원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">면적</span>
                      <span className="font-medium text-gray-900">47㎡</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">층수</span>
                      <span className="font-medium text-gray-900">지상 2층</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">연락처 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">담당자명</span>
                      <span className="font-medium text-gray-900">김부동산</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">연락처</span>
                      <span className="font-medium text-blue-600">010-1234-5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">등록일</span>
                      <span className="font-medium text-gray-900">2024.12.15</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">매물 특징</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <div className="mb-1 text-sm text-gray-600">주차</div>
                    <div className="font-medium">2대 가능</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <div className="mb-1 text-sm text-gray-600">화장실</div>
                    <div className="font-medium">남녀분리</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <div className="mb-1 text-sm text-gray-600">엘리베이터</div>
                    <div className="font-medium">있음</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">관련 서류</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={handlePDFPreview}
                    className="flex flex-1 items-center justify-center space-x-2 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">PDF 미리보기</span>
                  </button>
                  <button
                    onClick={handlePDFDownload}
                    className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">PDF 다운로드</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">창업 적합도 분석</h3>
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
                <p className="mb-4 text-gray-600">
                  해당 지역의 상권 분석, 유동 인구, 경쟁업체 현황을 종합하여 창업 성공 가능성을 평가했습니다.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">8.5</div>
                    <div className="text-sm text-gray-600">상권 활성도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">9.2</div>
                    <div className="text-sm text-gray-600">접근성</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">7.8</div>
                    <div className="text-sm text-gray-600">경쟁 강도</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">추천 업종</h3>
                <div className="space-y-3">
                  {property.suitableBusinesses.map((business, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <span className="font-medium text-gray-900">{business.name}</span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${business.percentage}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-medium text-gray-600">{business.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">상세 분석 내용</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">🚶‍♂️ 유동 인구 분석</h4>
                    <p className="text-sm text-gray-600">
                      평일 오전 시간대 유동인구가 많으며, 직장인과 대학생 비율이 높습니다. 점심시간(12-13시) 집중도가
                      특히 높아 음식업에 유리한 조건입니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">🏢 상권 특성</h4>
                    <p className="text-sm text-gray-600">
                      업무지구와 인접해 있어 B2B 서비스업과 직장인 대상 서비스업이 활발합니다. 임대료 대비 매출 효율이
                      우수한 지역으로 평가됩니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">⚠️ 주의사항</h4>
                    <p className="text-sm text-gray-600">
                      주말 유동인구 감소와 주변 대형 프랜차이즈 카페의 경쟁이 예상됩니다. 차별화된 메뉴나 서비스 전략이
                      필요합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-6 text-center">
                <h4 className="mb-2 font-semibold text-gray-900">더 자세한 분석이 필요하신가요?</h4>
                <p className="mb-4 text-sm text-gray-600">AI와 대화하며 맞춤형 창업 전략을 수립해보세요</p>
                <button
                  onClick={handleAIAnalysisClick}
                  className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                  AI 분석 보기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
