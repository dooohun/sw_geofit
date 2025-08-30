/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import busStopData from '@/lib/bus-data.json';
import bus from '@/assets/images/bus.png';
import map from '@/assets/images/map.png';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerData {
  position: { lat: number; lng: number };
  title: string;
  category: string;
  image?: {
    src: string;
    size: { width: number; height: number };
  };
}

const POI_CATEGORIES = {
  bank: {
    code: 'BK9',
    name: '은행',
    color: '#10B981', // green-500
  },
  culture: {
    code: 'CT1',
    name: '문화시설',
    color: '#8B5CF6', // violet-500
  },
  public: {
    code: 'PO3',
    name: '공공기관',
    color: '#3B82F6', // blue-500
  },
  tourism: {
    code: 'AT4',
    name: '관광명소',
    color: '#F59E0B', // amber-500
  },
  accommodation: {
    code: 'AD5',
    name: '숙박',
    color: '#EC4899', // pink-500
  },
  hospital: {
    code: 'HP8',
    name: '병원',
    color: '#EF4444', // red-500
  },
  mart: {
    code: 'CS2',
    name: '편의점',
    color: '#06B6D4', // cyan-500
  },
  school: {
    code: 'SC4',
    name: '학교',
    color: '#84CC16', // lime-500
  },
  kindergarten: {
    code: 'PS3',
    name: '어린이집',
    color: '#F97316', // orange-500
  },
};

const createMapPinMarker = (color: string, size: number = 24) => {
  const svgString = `
    <svg width="${size + 4}" height="${size + 4}" viewBox="0 0 ${size + 4} ${size + 4}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2, 2)">
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3" fill="white" stroke="${color}"/>
        </svg>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // 지구 반경 (m)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // meters
}

export default function LocationMapPage({ data }: { data: any }) {
  const mapSection = data.sections.find((s: any) => s.type === 'text');
  const mapData = mapSection?.content;

  const center = {
    lat: 36.4875,
    lng: 127.2514,
  };
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<MarkerData | null>(null);
  const [busStopMarkers, setBusStopMarkers] = useState<MarkerData[]>([]);

  const createBusStopMarkers = () => {
    const newBusStopMarkers: MarkerData[] = busStopData
      .map((busStop) => {
        const { latitude, longtitude } = busStop;
        const distance = getDistanceFromLatLonInM(center.lat, center.lng, latitude, longtitude);

        if (distance <= 500) {
          // 500m 이내만 필터링
          return {
            position: {
              lat: latitude,
              lng: longtitude,
            },
            title: `🚌 ${busStop.bus_stop} (ID: ${busStop.id})`,
            category: 'bus_stop_data',
            image: {
              src: bus,
              size: { width: 20, height: 20 },
            },
          };
        }
        return null;
      })
      .filter((marker) => marker !== null) as MarkerData[];

    setBusStopMarkers(newBusStopMarkers);
  };

  // POI 마커 검색 및 추가
  const searchPOIMarkers = () => {
    const ps = new window.kakao.maps.services.Places();

    Object.entries(POI_CATEGORIES).forEach(([categoryKey, category]) => {
      if (!category) return;

      ps.categorySearch(
        category.code,
        (data: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const categoryMarkers = data.map((place) => ({
              position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
              title: place.place_name,
              category: categoryKey,
              image: {
                src: createMapPinMarker(category.color, 28),
                size: { width: 28, height: 28 },
              },
            }));

            allMarkers.push(...categoryMarkers);
            setMarkers((prev) => {
              // 같은 카테고리의 기존 마커 제거 후 새 마커 추가
              const filtered = prev.filter((marker) => marker.category !== categoryKey);
              return [...filtered, ...categoryMarkers];
            });
          }
        },
        {
          location: new window.kakao.maps.LatLng(center.lat, center.lng),
          radius: 500,
        },
      );
    });
  };

  const addCurrentLocationMarker = () => {
    const currentMarker: MarkerData = {
      position: center,
      title: '현재 위치 (공실)',
      category: 'current',
      image: {
        src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 별 아이콘
        size: { width: 40, height: 40 },
      },
    };
    setCurrentLocationMarker(currentMarker);
  };

  useEffect(() => {
    searchPOIMarkers();
    createBusStopMarkers();
    addCurrentLocationMarker();
  }, []);

  const markerStats = Object.keys(POI_CATEGORIES).reduce(
    (acc, key) => {
      acc[key] = markers.filter((marker) => marker.category === key).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  // 표시할 모든 마커 (POI + 현재위치 + 버스정류장)
  const allMarkers = [...markers, ...busStopMarkers, ...(currentLocationMarker ? [currentLocationMarker] : [])];

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 헤더 */}
      <div className="px-16 pt-6 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Map className="mr-3 h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">공실 위치 맵</h1>
          </div>
          <div className="text-sm text-gray-500">3/11</div>
        </div>

        <div className="rounded-lg border border-green-100 p-4">
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-green-600" />
            <span className="font-semibold text-gray-800">{mapData?.center}</span>
            <span className="ml-4 text-sm text-gray-600">• 반경 {mapData?.radius_m}m</span>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 - 맵과 통계 */}
      <div className="mb-8 px-16">
        <div>
          <div className="relative rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
            <div className="absolute top-6 right-6 z-50 rounded-lg border border-gray-200 bg-white p-3 shadow-md">
              <h4 className="mb-2 text-sm font-bold text-gray-700">범례</h4>
              <div className="space-y-1">
                {Object.entries(POI_CATEGORIES).map(([key, category]) => (
                  <div key={key} className="flex items-center text-xs">
                    <MapPin className="mr-2 h-4 w-4" style={{ color: category.color, fill: category.color }} />
                    <span className="text-gray-600">{category.name}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center border-t border-gray-200 pt-1 text-xs">
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  </div>
                  <span className="text-gray-600">버스정류장</span>
                </div>
                <div className="flex items-center text-xs">
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  </div>
                  <span className="text-gray-600">현재위치</span>
                </div>
              </div>
            </div>
            <div style={{ height: '420px' }} className="w-full">
              <img src={map} />
              {/* <KakaoMap
                width="100%"
                height="420px"
                center={center}
                level={4}
                markers={allMarkers}
                showCircle
                circleOptions={{
                  center: center,
                  radius: 500, // 500m 반경
                  strokeWeight: 2,
                  strokeColor: '#FF6B6B',
                  strokeOpacity: 0.8,
                  fillColor: '#FF6B6B',
                  fillOpacity: 0.1,
                }}
              /> */}
            </div>
            <div className="mt-3 text-center text-sm text-gray-500">{mapData?.map_note}</div>
          </div>
        </div>
      </div>

      {/* 하단 그리드 통계 */}
      <div className="px-16 pb-16">
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="mb-4 text-center text-lg font-bold text-gray-800">
            반경 {mapData?.radius_m}m 내 주요 시설 분포
          </h3>

          <div className="grid grid-cols-5 gap-3">
            {Object.keys(markerStats).map((key) => (
              <div
                key={key}
                className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-lg font-bold text-gray-800">
                  {POI_CATEGORIES[key as keyof typeof POI_CATEGORIES].name}
                </div>
                <div className="text-xs leading-tight text-gray-600">{markerStats[key]}</div>
              </div>
            ))}
            <div className="rounded-lg border border-gray-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="text-lg font-bold text-gray-800">버스정류장</div>
              <div className="text-xs leading-tight text-gray-600">{busStopMarkers.length}</div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            * 도보 5분 거리 내 접근 가능한 주요 시설들을 표시했습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
