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
