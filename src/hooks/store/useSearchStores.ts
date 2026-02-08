import { api } from "@/api/axios";
import type { RestaurantSummary } from "@/types/store";
import { useQuery } from "@tanstack/react-query";

type Params = {
  keyword: string;
  lat: number;
  lng: number;
  radius?: number;
  category?: "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";
  sort?: "DISTANCE" | "RATING";
  page?: number;
  limit?: number;
  sido?: string;
  sigungu?: string;
  bname?: string;
};

type ApiStoreSummary = {
  storeId: number;
  name: string;
  address: string;
  category: RestaurantSummary["category"];
  rating: number | null;
  reviewCount: number | null;
  distanceKm?: number | null;
  thumbnailUrl?: string | null;
  isOpenNow?: boolean | null;
  lat: number;
  lng: number;
};

type ApiResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    stores: ApiStoreSummary[];
    pagination: {
      page: number;
      limit: number;
      totalCount: number;
      totalPages: number;
      hasNext: boolean;
    };
  };
};

function toSummary(s: ApiStoreSummary): RestaurantSummary {
  return {
    id: s.storeId,
    name: s.name,
    address: s.address,
    category: s.category,
    rating: typeof s.rating === "number" ? s.rating : 0,
    reviewCount: typeof s.reviewCount === "number" ? s.reviewCount : 0,
    distanceKm: s.distanceKm ?? undefined,
    thumbnailUrl: s.thumbnailUrl ?? undefined,
    isOpenNow: s.isOpenNow ?? undefined,
    location: { lat: s.lat, lng: s.lng },
  };
}

export function useSearchStores(params: Params | null) {
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

      const res = await api.get<ApiResponse>("/api/v1/stores/search", {
        params: cleanParams,
      });
      console.log(
        "[search raw result]",
        res.data?.result,
        Array.isArray(res.data?.result),
      );

      const stores = res.data.result?.stores ?? [];
      return stores.map(toSummary);
    },
  });
}
