import { getAvailableTables } from "@/api/endpoints/reservations";
import { queryKeys } from "@/query/keys"
import { useQuery } from "@tanstack/react-query";
import type { SeatType } from "@/types/restaurant";

export type AvailableTablesInput = {
  storeId?: string | number;
  date?: string;
  time?: string;
  partySize?: number;
  isSplitAccepted?: boolean;
  seatsType?: SeatType;
};

export function useAvailableTables(input: AvailableTablesInput) {
  const { storeId, date, time, partySize, isSplitAccepted, seatsType } = input;
  const enabled =
    storeId !== undefined &&
    date !== undefined &&
    time !== undefined &&
    partySize !== undefined &&
    isSplitAccepted !== undefined &&

  return useQuery({
    queryKey: enabled
      ? queryKeys.reservation.availableTables(storeId!, {
          date,
          time,
          partySize,
          isSplitAccepted,
          seatsType: seatsType ?? null,
        })
      : ["reservation", "availableTables", "disabled"],
    queryFn: () =>
      getAvailableTables({
        storeId: storeId!,
        date: date!,
        time: time!,
        partySize: partySize!,
        isSplitAccepted: isSplitAccepted!,
        ...(seatsType ? {seatsType}: {}),
      }),
    enabled,
  });
}
