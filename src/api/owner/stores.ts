import { api } from '@/api/axios';
import type { ApiResponse } from '@/types/api';


const OWNER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvd25lckBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9PV05FUiIsImlhdCI6MTc3MDU3MDE5NywiZXhwIjo0OTI0MTcwMTk3fQ.0O8-mHTT6j59VTuMYmtGZs4r7JvqlsRi0jU09601iKs"

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
    {
        headers: {
            Authorization: `Bearer ${OWNER_TOKEN}`
        }
    }
  );
}

export function updateBusinessHours(
  storeId: number | string,
  businessHours: BusinessHour[]
) {
  return api.patch<ApiResponse<{ businessHours: BusinessHour[] }>>(
    `/api/v1/stores/${storeId}/business-hours`,
    { businessHours },
    {
        headers: {
            Authorization: `Bearer ${OWNER_TOKEN}`
        }
    }
  );
}
