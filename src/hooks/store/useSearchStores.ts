import { useQuery } from "@tanstack/react-query";

import { api } from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type {
  ApiStoreSummary,
  RestaurantSummary,
  SearchStoreParams,
  SearchStoresResult,
} from "@/types/store";

const toNum = (v: unknown): number | undefined => {
  if (v == null) return undefined;
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : undefined;
};

function toSummary(s: ApiStoreSummary): RestaurantSummary {
  const lat = toNum(s.latitude ?? s.lat);
  const lng = toNum(s.longitude ?? s.lng);
  return {
    id: s.storeId,
    name: s.name,
    address: s.address,
    category: s.category,
    rating: typeof s.rating === "number" ? s.rating : 0,
    reviewCount: typeof s.reviewCount === "number" ? s.reviewCount : 0,
    distanceKm: typeof s.distance === "number" ? s.distance : undefined,
    thumbnailUrl: s.mainImageUrl ?? undefined,
    isOpenNow: s.isOpenNow ?? undefined,
    ...(lat != null && lng != null ? { location: { lat, lng } } : {}),
  };
}

export function useSearchStores(params: SearchStoreParams | null) {
  return useQuery({
    queryKey: ["searchStores", params],
    enabled: !!params && !!params.keyword,
    queryFn: async () => {
      if (!params) return [];
      const cleanParams: Record<string, string | number> = {
        lat: params.lat,
        lng: params.lng,
        page: params.page ?? 1,
        limit: params.limit ?? 20,
      };
      if (params.keyword) cleanParams.keyword = params.keyword;
      if (typeof params.radius === "number") cleanParams.radius = params.radius;
      if (params.category) cleanParams.category = params.category;
      if (params.sort) cleanParams.sort = params.sort;
      if (params.sido) cleanParams.sido = params.sido;
      if (params.sigungu) cleanParams.sigungu = params.sigungu;
      if (params.bname) cleanParams.bname = params.bname;

      const res = await api.get<ApiResponse<SearchStoresResult>>("/api/v1/stores/search", {
        params: cleanParams,
      });

      const stores = res.data.result?.stores ?? [];
      return stores.map(toSummary);
    },
  });
}
