import { propertyApi } from '@/api/property';
import type { PropertyRequest } from '@/api/property/entity';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

export const useGetDong = () => {
  return useSuspenseQuery({
    queryKey: ['property', 'dong'],
    queryFn: () => propertyApi.getPropertyDong(),
  });
};

export const useGetFloor = () => {
  return useSuspenseQuery({
    queryKey: ['property', 'floor'],
    queryFn: () => propertyApi.getPropertyFloor(),
  });
};

export const useGetType = () => {
  return useSuspenseQuery({
    queryKey: ['property', 'type'],
    queryFn: () => propertyApi.getPropertyType(),
  });
};

export const useMutateProperty = () => {
  return useMutation({
    mutationFn: (data: PropertyRequest): Promise<number> => propertyApi.registerProperty(data),
  });
};
