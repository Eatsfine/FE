import { api } from '@/api/axios';
import type { ApiResponse } from '@/types/api';

export interface StoreDetail {
  storeId: number;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  businessHours?: BusinessHour[];
  isApproved: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface BusinessHour {
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  openTime: string|null;
  closeTime: string|null;
  isClosed: boolean;
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface MyStore {
  storeId: number;
  storeName: string;
  address: string;
  category: string;
  rating: number;
  totalBookingCount: number;
  reviewCount: number;
  mainImageUrl: string;
  isOpenNow: boolean;
}

interface MyStoreResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    stores: MyStore[];
  };
}


export function getStore(storeId: number | string) {
  return api.get<ApiResponse<StoreDetail>>(
    `/api/v1/stores/${storeId}`
  );
}

export function updateStore(
  storeId: number | string,
  body: {
    storeName: string;
    description: string;
    phoneNumber: string;
  }
) {
  return api.patch<ApiResponse<any>>(
    `/api/v1/stores/${storeId}`,
    body,
  );
}

export function updateBusinessHours(
  storeId: number | string,
  businessHours: BusinessHour[]
) {
  return api.patch<ApiResponse<{ businessHours: BusinessHour[] }>>(
    `/api/v1/stores/${storeId}/business-hours`,
    { businessHours },
  );
}

export const getMyStores = async (): Promise<MyStore[]> => {
  const res = await api.get<MyStoreResponse>("/api/v1/stores/my");
  return res.data.result.stores;
};