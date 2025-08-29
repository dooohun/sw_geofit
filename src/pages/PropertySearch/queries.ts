import { propertyApi } from '@/api/property';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetProperties = () => {
  return useSuspenseQuery({
    queryKey: ['property', 'all'],
    queryFn: () => propertyApi.getAllProperties(),
  });
};

export const useGetDetailProperty = (propertyId: number) => {
  return useSuspenseQuery({
    queryKey: ['property', 'detail', propertyId],
    queryFn: () => propertyApi.getDetailProperty(propertyId),
  });
};
