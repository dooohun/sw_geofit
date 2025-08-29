/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Kakaomap.tsx
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerData {
  position: { lat: number; lng: number };
  title: string;
  category?: string;
  image?: {
    src: string;
    size: { width: number; height: number };
  };
}

interface CircleOptions {
  center: { lat: number; lng: number };
  radius: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  fillColor?: string;
  fillOpacity?: number;
}

interface KakaoMapProps {
  width: string;
  height: string;
  center: { lat: number; lng: number };
  level: number;
  markers?: MarkerData[];
  showCircle?: boolean;
  circleOptions?: CircleOptions;
}

export default function KakaoMap({
  width,
  height,
  center,
  level,
  markers = [],
  showCircle = false,
  circleOptions,
}: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circleRef = useRef<any>(null);

  // 지도 초기화
  useEffect(() => {
    if (!window.kakao || !mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: level,
    };

    mapRef.current = new window.kakao.maps.Map(mapContainer.current, options);
  }, []);

  // 지도 중심점 변경
  useEffect(() => {
    if (!mapRef.current) return;

    const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(moveLatLng);
  }, [center]);

  // 지도 레벨 변경
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setLevel(level);
  }, [level]);

  // 마커 관리
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 추가
    markers.forEach((markerData) => {
      const markerPosition = new window.kakao.maps.LatLng(markerData.position.lat, markerData.position.lng);

      let marker;

      if (markerData.image) {
        // 커스텀 이미지 마커
        const markerImage = new window.kakao.maps.MarkerImage(
          markerData.image.src,
          new window.kakao.maps.Size(markerData.image.size.width, markerData.image.size.height),
        );

        marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
      } else {
        // 기본 마커
        marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
      }

      // 정보창 (클릭 시 표시)
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:8px;font-size:12px;white-space:nowrap;">${markerData.title}</div>`,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(mapRef.current, marker);
      });

      // 마커를 지도에 표시
      marker.setMap(mapRef.current);
      markersRef.current.push(marker);
    });
  }, [markers]);

  // 원형 오버레이 관리
  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 원 제거
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }

    // 새 원 추가
    if (showCircle && circleOptions) {
      const circle = new window.kakao.maps.Circle({
        center: new window.kakao.maps.LatLng(circleOptions.center.lat, circleOptions.center.lng),
        radius: circleOptions.radius,
        strokeWeight: circleOptions.strokeWeight || 2,
        strokeColor: circleOptions.strokeColor || '#FF6B6B',
        strokeOpacity: circleOptions.strokeOpacity || 0.8,
        fillColor: circleOptions.fillColor || '#FF6B6B',
        fillOpacity: circleOptions.fillOpacity || 0.1,
      });

      circle.setMap(mapRef.current);
      circleRef.current = circle;
    }
  }, [showCircle, circleOptions]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width,
        height,
        borderRadius: '8px',
        border: '1px solid #ddd',
      }}
    />
  );
}
