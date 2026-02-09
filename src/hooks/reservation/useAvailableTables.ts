import { api } from "@/api/axios";
import { queryKeys } from "@/query/keys";
import { useQuery } from "@tanstack/react-query";

type Params = {
  storeId: number;
  date: string;
  time: string;
  partySize: number;
  isSplitAccepted: boolean;
  seatsType?: string;
};

type ApiTable = {
  tableId: number;
  tableNumber: string;
  tableSeats: number;
  seatsType: string;
  gridX: number;
  gridY: number;
  widthSpan: number;
  heightSpan: number;
};

type ApiResult = {
  rows: number;
  cols: number;
  tables: ApiTable[];
};

export function useAvailableTables(params: Params | null) {
  return useQuery({
    queryKey: params
      ? queryKeys.reservation.availableTables(params.storeId, params)
      : ["reservation", "availableTables", "disabled"],
    enabled: !!params,
    queryFn: async () => {
      const { storeId, ...query } = params!;
      const res = await api.get<{ isSuccess: boolean; result: ApiResult }>(
        `/api/v1/stores/${storeId}/bookings/available-tables`,
        { params: query },
      );
      return res.data.result;
    },
  });
}
