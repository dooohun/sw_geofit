import { useEffect, useState } from 'react';
import PropertyDetailModal from './modal';
import { useGetProperties } from './queries';
import type { PropertiesResponse } from '@/api/property/entity';
import { filesApi } from '@/api/files';

export default function PropertySearchPage() {
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelelectedSigungu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [propertyData, setPropertyData] = useState<PropertiesResponse>();

  const { data: fetchedPropertyData } = useGetProperties();

  const changeImageUrl = async () => {
    if (fetchedPropertyData) {
      const updatedProperties = await Promise.all(
        fetchedPropertyData.properties.map(async (property) => {
          const { url } = await filesApi.downloadFile(property.image);
          return {
            ...property,
            image: url,
          };
        }),
      );
      setPropertyData({ count: updatedProperties.length, properties: updatedProperties });
    }
  };

  useEffect(() => {
    changeImageUrl();
  }, [fetchedPropertyData]);

  const handleCardClick = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPropertyId(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">매물 조회</h1>
        </div>

        {/* Search Filter */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-5 gap-4">
            {/* Location Filters */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">지역선택*</label>
              <div className="relative">
                <select
                  value={selectedSido}
                  onChange={(e) => setSelectedSido(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">시/도 선택</option>
                  <option value="서울">서울특별시</option>
                  <option value="부산">부산광역시</option>
                  <option value="대구">대구광역시</option>
                  <option value="인천">인천광역시</option>
                  <option value="경기">경기도</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">시/군/구 선택</label>
              <div className="relative">
                <select
                  value={selectedSigungu}
                  onChange={(e) => setSelelectedSigungu(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">시/군/구 선택</option>
                  <option value="강남구">강남구</option>
                  <option value="강북구">강북구</option>
                  <option value="마포구">마포구</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">읍/면/동 선택</label>
              <div className="relative">
                <select
                  value={selectedDong}
                  onChange={(e) => setSelectedDong(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">읍/면/동 선택</option>
                  <option value="역삼동">역삼동</option>
                  <option value="삼성동">삼성동</option>
                  <option value="청담동">청담동</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Business Type Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">업종선택*</label>
              <div className="relative">
                <select
                  value={selectedBusinessType}
                  onChange={(e) => setSelectedBusinessType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">업종 선택</option>
                  <option value="카페">카페</option>
                  <option value="음식점">음식점</option>
                  <option value="사무실">사무실</option>
                  <option value="소매업">소매업</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                검색하기
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <label className="mb-3 block text-sm font-medium text-gray-700">임대료*</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">임대료를 선택하세요</option>
                  <option value="0-100">100만원 이하</option>
                  <option value="100-200">100-200만원</option>
                  <option value="200-300">200-300만원</option>
                  <option value="300+">300만원 이상</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{propertyData?.count}</span>개 매물
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {propertyData?.properties.map((property) => {
            // 분석 완료 여부 체크
            const isAnalysisComplete =
              property.rec1Type &&
              property.rec2Type &&
              property.rec3Type &&
              property.reason1 &&
              property.reason2 &&
              property.reason3;

            return (
              <div
                key={property.propertyId}
                className="group relative transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleCardClick(property.propertyId)}
              >
                {/* Property Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.dong}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Property Info */}
                <div className="p-5">
                  {/* Location & Basic Info */}
                  <div className="mb-3">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="line-clamp-1 text-lg font-bold text-gray-900">{property.dong}</h3>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {property.floor}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{property.propertyType}</p>
                  </div>

                  {/* Price Info */}
                  <div className="mb-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-blue-600">
                        월세 {Math.floor(property.rent / 10000).toLocaleString()}만원
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>보증금 {Math.floor(property.deposit / 10000).toLocaleString()}만원</span>
                      <span>•</span>
                      <span>{property.area}㎡</span>
                    </div>
                  </div>

                  {/* Analysis Status */}
                  {isAnalysisComplete ? (
                    <>
                      {/* 추천 업종 */}
                      <div className="mb-4">
                        <div className="mb-2 flex items-center gap-1">
                          <span className="text-xs font-medium text-gray-700">추천 업종</span>
                          <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[property.rec1Type, property.rec2Type, property.rec3Type].map((type, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200"
                            >
                              #{type}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 핵심 근거 */}
                      <div className="mb-5">
                        <div className="mb-2 flex items-center gap-1">
                          <span className="text-xs font-medium text-gray-700">핵심 근거</span>
                          <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[property.reason1, property.reason2, property.reason3].map((reason, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                            >
                              #{reason}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(property.propertyId);
                        }}
                      >
                        자세히 보기
                      </button>
                    </>
                  ) : (
                    /* 분석 중 상태 */
                    <div className="space-y-4">
                      <div className="rounded-xl bg-amber-50 p-4 text-center">
                        <div className="mb-2 flex items-center justify-center">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
                        </div>
                        <p className="text-sm font-medium text-amber-800">분석 중입니다</p>
                        <p className="mt-1 text-xs text-amber-600">업종 추천 및 입지 분석을 진행하고 있어요</p>
                      </div>

                      <button
                        className="w-full rounded-xl bg-[#4D96FF] bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(property.propertyId);
                        }}
                      >
                        자세히 보기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {selectedPropertyId && (
          <PropertyDetailModal isOpen={isModalOpen} onClose={closeModal} propertyId={selectedPropertyId} />
        )}
      </div>
    </div>
  );
}
