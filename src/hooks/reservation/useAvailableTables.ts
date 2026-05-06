import { useQuery } from "@tanstack/react-query";

import { getAvailableTables } from "@/api/endpoints/reservations";
import { queryKeys } from "@/query/keys";
import type { GetAvailableTablesParams } from "@/types/reservation";

export function useAvailableTables(params: GetAvailableTablesParams | null) {
  return useQuery({
    queryKey: params
      ? queryKeys.reservation.availableTables(params.storeId, params)
      : ["reservation", "availableTables", "disabled"],
    enabled: !!params,
    queryFn: async () => {
      return getAvailableTables(params!);
    },
  });
}
