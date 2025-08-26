import { useState } from 'react';
import PropertyDetailModal from './modal';
import { createPortal } from 'react-dom';

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

const properties: Property[] = [
  {
    id: '1',
    title: '광교중앙역 인근 상가',
    address: '경기도 수원시 영통구 광교로 147',
    price: '월세 180만원',
    score: 95,
    scoreText: '매우 우수',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    businessTypes: ['한식당', '카페', '치킨'],
    suitableBusinesses: [
      { name: '한식당', percentage: 92 },
      { name: '카페', percentage: 88 },
      { name: '치킨', percentage: 85 },
    ],
  },
  {
    id: '2',
    title: '강남역 초역세권 오피스텔',
    address: '서울특별시 강남구 태헌로 123',
    price: '월세 350만원',
    score: 88,
    scoreText: '우수',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    businessTypes: ['IT스타트업', '컨설팅', '디자인'],
    suitableBusinesses: [
      { name: 'IT스타트업', percentage: 94 },
      { name: '컨설팅', percentage: 89 },
      { name: '디자인', percentage: 85 },
    ],
  },
  {
    id: '3',
    title: '홍대 청년창업공간',
    address: '서울특별시 마포구 홍익로 89',
    price: '월세 120만원',
    score: 92,
    scoreText: '매우 우수',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
    businessTypes: ['온라인쇼핑', '크리에이티브', '엔터테인먼트'],
    suitableBusinesses: [
      { name: '온라인쇼핑', percentage: 90 },
      { name: '크리에이티브', percentage: 87 },
      { name: '엔터테인먼트', percentage: 84 },
    ],
  },
  {
    id: '4',
    title: '판교 테크벨리 사무공간',
    address: '경기도 성남구 분당구 판교역로 235',
    price: '월세 280만원',
    score: 89,
    scoreText: '우수',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop',
    businessTypes: ['소프트웨어', '핀테크', 'AI/ML'],
    suitableBusinesses: [
      { name: '소프트웨어', percentage: 95 },
      { name: '핀테크', percentage: 91 },
      { name: 'AI/ML', percentage: 88 },
    ],
  },
  {
    id: '5',
    title: '이태원 글로벌 레스토랑',
    address: '서울특별시 용산구 이태원로 156',
    price: '월세 220만원',
    score: 84,
    scoreText: '양호',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    businessTypes: ['레스토랑', '바', '카페'],
    suitableBusinesses: [
      { name: '양식당', percentage: 88 },
      { name: '바', percentage: 82 },
      { name: '카페', percentage: 79 },
    ],
  },
  {
    id: '6',
    title: '신촌 대학가 상점',
    address: '서울특별시 서대문구 신촌로 78',
    price: '월세 150만원',
    score: 87,
    scoreText: '우수',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    businessTypes: ['치킨', '카페', '편의점'],
    suitableBusinesses: [
      { name: '치킨집', percentage: 89 },
      { name: '카페', percentage: 84 },
      { name: '편의점', percentage: 81 },
    ],
  },
  {
    id: '7',
    title: '부산 해운대 관광상가',
    address: '부산광역시 해운대구 해운대해변로 264',
    price: '월세 200만원',
    score: 90,
    scoreText: '매우 우수',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    businessTypes: ['관광기념품', '레스토랑', '카페'],
    suitableBusinesses: [
      { name: '관광기념품', percentage: 94 },
      { name: '해산물집', percentage: 90 },
      { name: '카페', percentage: 86 },
    ],
  },
  {
    id: '8',
    title: '대전 유성구 연구단지',
    address: '대전광역시 유성구 대덕대로 468',
    price: '월세 160만원',
    score: 86,
    scoreText: '우수',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    businessTypes: ['연구개발', '바이오', '첨단기술'],
    suitableBusinesses: [
      { name: '연구개발', percentage: 92 },
      { name: '바이오텍', percentage: 88 },
      { name: '첨단기술', percentage: 85 },
    ],
  },
  {
    id: '9',
    title: '인천공항 면세구역 상가',
    address: '인천광역시 중구 공항로 271',
    price: '월세 300만원',
    score: 93,
    scoreText: '매우 우수',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    businessTypes: ['면세점', '레스토랑', '여행용품'],
    suitableBusinesses: [
      { name: '면세점', percentage: 96 },
      { name: '공항레스토랑', percentage: 92 },
      { name: '여행용품', percentage: 89 },
    ],
  },
];

export default function PropertySearchPage() {
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelelectedSigungu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 85) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getButtonColor = (score: number) => {
    if (score >= 90) return 'bg-green-600 hover:bg-green-700';
    if (score >= 85) return 'bg-blue-600 hover:bg-blue-700';
    return 'bg-gray-600 hover:bg-gray-700';
  };

  const handleCardClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}

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
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              <button className="w-full cursor-pointer rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
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
                  className="cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            총 <span className="font-semibold text-blue-600">{properties.length}</span>개 매물
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
              onClick={() => handleCardClick(property)}
            >
              {/* Property Image */}
              <div className="relative aspect-[4/3]">
                <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                <div
                  className={`absolute top-3 right-3 rounded-full border px-2 py-1 text-xs font-medium ${getScoreBadgeColor(property.score)}`}
                >
                  {property.score}점
                </div>
              </div>

              {/* Property Info */}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-1 font-semibold text-gray-900">{property.title}</h3>
                <p className="mb-3 line-clamp-1 text-sm text-gray-600">{property.address}</p>
                <div className="mb-3 text-lg font-bold text-red-600">{property.price}</div>

                {/* Suitable Businesses */}
                <div className="mb-4">
                  <div
                    className={`mb-2 text-xs font-medium ${
                      property.score >= 90 ? 'text-green-600' : property.score >= 85 ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    창업 적합도: {property.scoreText} ({property.score}점)
                  </div>

                  <div className="space-y-1">
                    {property.suitableBusinesses.slice(0, 2).map((business, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{business.name}</span>
                        <span className="font-medium text-gray-900">{business.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Types Tags */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {property.businessTypes.slice(0, 3).map((type, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      {type}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors ${getButtonColor(property.score)}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(property);
                  }}
                >
                  상세 리포트 다운로드
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Property Detail Modal */}
        {createPortal(
          <PropertyDetailModal isOpen={isModalOpen} onClose={closeModal} property={selectedProperty} />,
          document.body,
        )}
      </div>
    </div>
  );
}
