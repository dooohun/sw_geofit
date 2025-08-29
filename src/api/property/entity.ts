export interface PropertyDongResponse {
  id: number;
  name: string;
}

export interface PropertyFloorResponse {
  id: number;
  name: string;
}

export interface PropertyTypeResponse {
  id: number;
  name: string;
}

export interface PropertyRequest {
  sido: string;
  sigungu: string;
  dongId: number;
  typeId: number;
  floorId: number;
  area: number;
  rent: number;
  isMaintenance: boolean;
  deposit: number;
  imageUrls: string[];
  detailAddress: string;
}

export interface Property {
  propertyId: number;
  dong: string;
  floor: string;
  propertyType: string;
  area: number;
  rent: number;
  image: string;
  deposit: number;
  rec1Type: string | null;
  rec2Type: string | null;
  rec3Type: string | null;
  reason1: string | null;
  reason2: string | null;
  reason3: string | null;
}

export interface PropertiesResponse {
  count: number;
  properties: Property[];
}

export interface DetailPropertyResponse {
  propertyId: number;
  dong: string;
  sido: string;
  sigungu: string;
  floor: string;
  propertyType: string;
  detailAddress: string;
  area: number;
  rent: number;
  image: string;
  deposit: number;
  isMaintenance: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  pdfUrl: string;
  rentPosition: string | null;
  rec1Type: string | null;
  rec2Type: string | null;
  rec3Type: string | null;
  reason1: string | null;
  reason2: string | null;
  reason3: string | null;
  economy: string | null;
  demand: string | null;
  environment: string | null;
  rec1Score: number | null;
  rec2Score: number | null;
  rec3Score: number | null;
  rec1Reason: string | null;
  rec2Reason: string | null;
  rec3Reason: string | null;
  rec1Way: string | null;
  rec2Way: string | null;
  rec3Way: string | null;
}
