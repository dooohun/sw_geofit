/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Calendar, Building } from 'lucide-react';

// A4 사이즈: 210mm × 297mm = 794px × 1123px (96 DPI 기준)
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

// 표지 페이지 컴포넌트
export default function CoverPage({ data }: { data: any }) {
  const content = data.sections[0].content;
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-white"
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0"></div>

      {/* 헤더 영역 */}
      <div className="relative z-10 px-16 pt-16">
        <div className="mb-8 text-right text-sm text-gray-500">표지</div>

        {/* 메인 타이틀 */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-start text-4xl leading-tight font-bold text-[#4D96FF]">
            세종시 소담동
            <br />
            <p className="mt-2 text-2xl font-bold text-gray-500">공실 입지 적합도 리포트</p>
          </h1>
          <div className="mx-auto h-1"></div>
        </div>
      </div>

      {/* 중앙 정보 카드 */}
      <div className="relative z-10 mb-16 px-16">
        <div className="mx-8 rounded-2xl border border-gray-100 bg-white p-12 shadow-xl">
          {/* 주소 정보 */}
          <div className="mb-8 flex items-start">
            <MapPin className="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <div className="mb-2 text-lg font-semibold text-gray-800">위치</div>
              <div className="leading-relaxed text-gray-600">{content.address}</div>
            </div>
          </div>

          {/* 건물 정보 */}
          <div className="mb-8 flex items-start">
            <Building className="mt-1 mr-4 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div>
              <div className="mb-2 text-lg font-semibold text-gray-800">건물 정보</div>
              <div className="text-gray-600">
                <div className="mb-1">
                  {content.floor} · {content.area_sqm}㎡
                </div>
                <div>월 임대료: {content.rent_per_sqm.toLocaleString()}원/㎡</div>
              </div>
            </div>
          </div>

          {/* 분류 정보 */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <div>
              <span className="text-sm text-gray-500">규모 분류</span>
              <div className="mt-1 text-lg font-semibold text-blue-600">{content.bucket}급 매장</div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <div className="px-16 pb-16">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              발행일: {currentDate}
            </div>
            <div className="text-xl font-bold text-blue-600">Geo-Fit</div>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="h-2"></div>
      </div>

      {/* 장식 요소 */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-blue-100 opacity-20"></div>
      <div className="absolute bottom-40 left-20 h-20 w-20 rounded-full bg-blue-200 opacity-30"></div>
    </div>
  );
}
