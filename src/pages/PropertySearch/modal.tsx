import { useEffect, useState } from 'react';
import { X, MapPin, Building, Calendar, Download, MessageCircle } from 'lucide-react';
import { useGetDetailProperty } from './queries';
import { filesApi } from '@/api/files';
import type { DetailPropertyResponse } from '@/api/property/entity';

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

export default function PropertyDetailModal({ isOpen, onClose, propertyId }: PropertyDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'analysis'>('basic');

  const { data: fetchedPropertyData } = useGetDetailProperty(propertyId);
  const [property, setProperty] = useState<DetailPropertyResponse>(fetchedPropertyData);

  const changeImageUrl = async () => {
    if (fetchedPropertyData) {
      const urls = fetchedPropertyData.imageUrls;
      const newImages = await Promise.all(
        urls.map(async (url) => {
          const { url: newUrl } = await filesApi.downloadFile(url);
          return newUrl;
        }),
      );
      setProperty((prev) => ({ ...prev, imageUrls: newImages }));
    }
  };

  useEffect(() => {
    changeImageUrl();
  }, [fetchedPropertyData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !property) return null;

  // AI 분석 완료 여부 체크
  const isAnalysisComplete = property.rec1Type;

  const handleDownload = async () => {
    if (!property.pdfUrl) return;

    try {
      // presigned URL 생성
      const { url } = await filesApi.downloadFile(property.pdfUrl);

      // 새 창에서 다운로드 (브라우저가 자동으로 다운로드 처리)
      window.open(url, '_blank');
    } catch (error) {
      console.error('다운로드 실패:', error);
      alert('다운로드에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{property.dong} 매물 상세</h2>
              <p className="text-sm text-gray-500">
                {property.sido} {property.sigungu}
              </p>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('basic')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'basic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                기본 정보
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === 'analysis'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                AI 분석 리포트
                {!isAnalysisComplete && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    분석중
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto">
            {activeTab === 'basic' ? (
              <div className="p-6">
                {/* Property Image */}
                <div className="mb-6 aspect-video overflow-hidden rounded-xl">
                  <img src={property.imageUrls[0]} alt={property.dong} className="h-full w-full object-cover" />
                </div>

                {/* Basic Information Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Location Info */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      위치 정보
                    </h3>
                    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">주소</span>
                        <span className="text-sm font-medium">
                          {property.sido} {property.sigungu} {property.dong}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">상세주소</span>
                        <span className="text-sm font-medium">{property.detailAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Building className="h-5 w-5 text-blue-500" />
                      매물 정보
                    </h3>
                    <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">건물 종류</span>
                        <span className="text-sm font-medium">{property.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">층수</span>
                        <span className="text-sm font-medium">{property.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">면적</span>
                        <span className="text-sm font-medium">{property.area}㎡</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Information */}
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">임대료 정보</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-blue-50 p-4 text-center">
                      <p className="text-sm text-blue-600">월세</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {Math.floor(property.rent / 10000).toLocaleString()}만원
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <p className="text-sm text-green-600">보증금</p>
                      <p className="text-2xl font-bold text-green-700">
                        {Math.floor(property.deposit / 10000).toLocaleString()}만원
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-sm text-gray-600">관리비</p>
                      <p className="text-2xl font-bold text-gray-700">{property.isMaintenance ? '포함' : '별도'}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  등록일: {new Date(property.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
            ) : (
              <div className="p-6">
                {isAnalysisComplete ? (
                  <div className="space-y-8">
                    {/* Top 3 추천 업종 */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">Top 3 추천 업종</h3>
                      <div className="space-y-4">
                        {[
                          {
                            type: property.rec1Type,
                            score: property.rec1Score,
                            reason: property.rec1Reason,
                            way: property.rec1Way,
                          },
                          {
                            type: property.rec2Type,
                            score: property.rec2Score,
                            reason: property.rec2Reason,
                            way: property.rec2Way,
                          },
                          {
                            type: property.rec3Type,
                            score: property.rec3Score,
                            reason: property.rec3Reason,
                            way: property.rec3Way,
                          },
                        ].map((rec, index) => (
                          <div key={index} className="rounded-xl border border-gray-200 p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                  {index + 1}
                                </span>
                                <span className="text-lg font-semibold text-gray-900">{rec.type}</span>
                              </div>
                              <span className="text-2xl font-bold text-blue-600">{rec.score}</span>
                            </div>
                            <p className="mb-2 text-sm text-gray-600">{rec.reason}</p>
                            <div className="rounded-lg bg-blue-50 p-3">
                              <p className="text-sm font-medium text-blue-800">💡 활용 방안</p>
                              <p className="text-sm text-blue-700">{rec.way}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 임대료 포지셔닝 */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">임대료 포지셔닝</h3>
                      <div className="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-4">
                        <p className="text-lg font-medium text-gray-900">{property.rentPosition}</p>
                      </div>
                    </div>

                    {/* 상권 하이라이트 */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">상권 하이라이트</h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-red-50 p-4 text-center">
                          <p className="text-sm font-medium text-red-800">경제</p>
                          <p className="text-sm text-red-700">{property.economy}</p>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4 text-center">
                          <p className="text-sm font-medium text-blue-800">수요</p>
                          <p className="text-sm text-blue-700">{property.demand}</p>
                        </div>
                        <div className="rounded-lg bg-green-50 p-4 text-center">
                          <p className="text-sm font-medium text-green-800">환경</p>
                          <p className="text-sm text-green-700">{property.environment}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        onClick={handleDownload}
                      >
                        <Download className="h-5 w-5" />
                        AI 분석 리포트 보기
                      </button>
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-5 w-5" />
                        맞춤 매물 찾기
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 분석 중 상태 */
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">AI 분석 진행 중</h3>
                    <p className="mb-6 text-center text-gray-600">
                      상권 분석 및 업종 추천을 위해 데이터를 분석하고 있습니다.
                      <br />
                      잠시만 기다려 주세요.
                    </p>

                    {/* <div className="w-full max-w-md space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-green-600">상권 데이터 수집 완료</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                        <span className="text-sm text-blue-600">업종별 매출 분석 중...</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        <span className="text-sm text-gray-400">추천 업종 선정 대기</span>
                      </div>
                    </div> */}

                    <div className="mt-8 rounded-lg bg-amber-50 p-4 text-center">
                      <p className="text-sm text-amber-800">💡 분석이 완료되면 자동으로 업데이트됩니다.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
