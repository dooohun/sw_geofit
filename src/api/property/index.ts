import { apiClient } from '..';
import type { PropertyDongResponse, PropertyFloorResponse, PropertyRequest, PropertyTypeResponse } from './entity';

export const propertyApi = {
  getPropertyDong: async () => await apiClient.get<PropertyDongResponse[]>(`property/dong`),
  getPropertyFloor: async () => await apiClient.get<PropertyFloorResponse[]>(`property/floor`),
  getPropertyType: async () => await apiClient.get<PropertyTypeResponse[]>(`property/type`),
  registerProperty: async (data: PropertyRequest): Promise<number> =>
    await apiClient.post('property', {
      body: data,
    }),
};
