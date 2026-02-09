import { toRestaurantDetail } from "@/api/adapters/store.adapter";
import { api } from "@/api/axios";
import type { StoreDetailDataDTO } from "@/api/dto/store.dto";
import { queryKeys } from "@/query/keys";
import { useQuery } from "@tanstack/react-query";

export function useRestaurantDetail(storeId: number | null) {
  return useQuery({
    queryKey: queryKeys.restaurant.detail(storeId!),
    enabled: !!storeId,
    queryFn: async () => {
      const res = await api.get<{
        isSuccess: boolean;
        result: StoreDetailDataDTO;
      }>(`/api/v1/stores/${storeId}`);
      console.log("detail raw", res.data);
      return toRestaurantDetail(res.data.result);
    },
  });
}
