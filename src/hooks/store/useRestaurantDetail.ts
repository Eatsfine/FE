import { api } from "@/api/axios";
import type { BusinessHour, RestaurantDetail } from "@/types/store";
import { useQuery } from "@tanstack/react-query";

type ApiStoreDetail = {
  storeId: number;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  category: "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";
  rating: number;
  reviewCount: number | null;
  mainImageUrl: string | null;
  tableImageUrls: string[] | null;
  businessHours: BusinessHour[] | null;
  breakStartTime: string | null;
  breakEndTime: string | null;
  isOpenNow?: boolean;
  depositRate?: number | null;
};

function toRestaurantDetail(api: ApiStoreDetail): RestaurantDetail {
  const depositRatePercent = api.depositRate ?? 0;
  const depositRate = depositRatePercent / 100;
  return {
    id: api.storeId,
    name: api.storeName,
    description: api.description ?? "",
    address: api.address ?? "",
    phone: api.phone ?? "",
    category: api.category,
    rating: typeof api.rating === "number" ? api.rating : 0,
    reviewCount: api.reviewCount ?? 0,
    depositAmount: 0,
    mainImageUrl: api.mainImageUrl ?? undefined,
    tableImageUrls: api.tableImageUrls ?? [],
    businessHours: api.businessHours ?? [],
    breakTime:
      api.breakStartTime && api.breakEndTime
        ? { start: api.breakStartTime, end: api.breakEndTime }
        : undefined,
    isOpenNow: api.isOpenNow ?? undefined,
    depositRate,
  };
}

export function useRestaurantDetail(storeId: number | null) {
  return useQuery({
    queryKey: ["restaurantDetail", storeId],
    enabled: !!storeId,
    queryFn: async () => {
      const res = await api.get<{
        isSuccess: boolean;
        result: ApiStoreDetail;
      }>(`/api/v1/stores/${storeId}`);
      console.log("detail raw", res.data);
      return toRestaurantDetail(res.data.result);
    },
  });
}
