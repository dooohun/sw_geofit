/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/MapExample.tsx
import { useState, useEffect } from 'react';
import KakaoMap from '@/components/Kakaomap';
import busStopData from '@/lib/bus-data.json';
import baby from '@/assets/images/baby.png';
import bank from '@/assets/images/bank.png';
import bus from '@/assets/images/bus.png';
import cart from '@/assets/images/cart.png';
import convinence from '@/assets/images/convinence.png';
import culture from '@/assets/images/culture.png';
import government from '@/assets/images/government.png';
import hospital from '@/assets/images/hospital.png';
import school from '@/assets/images/school.png';

declare global {
  interface Window {
    kakao: any;
  }
}

// 마커 타입 정의
interface MarkerData {
  position: { lat: number; lng: number };
  title: string;
  category: string;
  image?: {
    src: string;
    size: { width: number; height: number };
  };
}

// POI 카테고리 정의
const POI_CATEGORIES = {
  bank: { code: 'BK9', name: '은행', icon: bank },
  culture: { code: 'CT1', name: '문화시설', icon: culture },
  public: { code: 'PO3', name: '공공기관', icon: government },
  tourism: { code: 'AT4', name: '관광명소', icon: culture },
  accommodation: { code: 'AD5', name: '숙박', icon: cart },
  hospital: { code: 'HP8', name: '병원', icon: hospital },
  mart: { code: 'CS2', name: '편의점', icon: convinence },
  school: { code: 'SC4', name: '학교', icon: school },
  kindergarten: {
    code: 'PS3',
    name: '어린이집/유치원',
    icon: baby,
  },
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

export default function MapExample() {
  // 세종시 중심으로 기본 위치 설정
  const center = {
    lat: 36.4875,
    lng: 127.2514,
  };
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<MarkerData | null>(null);
  const [busStopMarkers, setBusStopMarkers] = useState<MarkerData[]>([]);

  // 버스 정류장 마커 생성
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
              size: { width: 32, height: 32 },
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
    const allMarkers: MarkerData[] = [];

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
                src: category.icon,
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

  // 마커 통계 계산
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
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">🗺️ 세종시 지도 서비스</h1>
      {/* 지도 */}
      <div className="mb-6">
        <KakaoMap
          width="100%"
          height="600px"
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
        />
      </div>

      {/* 마커 통계 및 목록 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 마커 통계 */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">📊 마커 통계</h2>
          <div className="space-y-2">
            {busStopMarkers.length > 0 && (
              <div className="flex items-center justify-between rounded bg-purple-50 px-3 py-2">
                <span className="font-medium">🚌 버스정류장 (500m 내)</span>
                <span className="rounded bg-purple-200 px-2 py-1 text-sm">{busStopMarkers.length}개</span>
              </div>
            )}
            {Object.entries(POI_CATEGORIES).map(([key, category]) => {
              const count = markerStats[key] || 0;
              return count > 0 ? (
                <div key={key} className="flex items-center justify-between rounded bg-blue-50 px-3 py-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="rounded bg-blue-200 px-2 py-1 text-sm">{count}개</span>
                </div>
              ) : null;
            })}
            <div className="mt-4 border-t pt-2">
              <div className="flex items-center justify-between font-semibold">
                <span>총 마커 수</span>
                <span className="rounded bg-gray-200 px-2 py-1">{allMarkers.length}개</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
