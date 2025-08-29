/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    kakao: any;
  }
}

export interface KakaoMapProps {
  width?: string;
  height?: string;
  center?: {
    lat: number;
    lng: number;
  };
  level?: number;
}

export interface MarkerData {
  position: {
    lat: number;
    lng: number;
  };
  content?: string;
  title?: string;
}
