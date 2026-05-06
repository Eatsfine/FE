import type { ApiResponse } from "@/types/api";
import type {
  BookingDetailResult,
  GetSlotsResult,
  PatchBreakTimeRequest,
  UpdateSlotRequest,
  UpdateSlotResult,
} from "@/types/reservation";

import { api } from "../axios";

export const getTableSlots = (storeId: number, tableId: number, date: string) =>
  api.get<ApiResponse<GetSlotsResult>>(`/api/v1/stores/${storeId}/tables/${tableId}/slots`, {
    params: { date },
  });

export const updateTableSlotStatus = (storeId: number, tableId: number, body: UpdateSlotRequest) =>
  api.patch<ApiResponse<UpdateSlotResult>>(
    `/api/v1/stores/${storeId}/tables/${tableId}/slots`,
    body,
  );

export const patchBreakTime = (storeId: number, body: PatchBreakTimeRequest) => {
  return api.patch(`/api/v1/stores/${storeId}/break-time`, body);
};

export const getBookingDetail = (storeId: number, tableId: number, bookingId: number) =>
  api.get<ApiResponse<BookingDetailResult>>(
    `/api/v1/stores/${storeId}/tables/${tableId}/slots/${bookingId}`,
  );

export const cancelBookingByOwner = (storeId: number, tableId: number, bookingId: number) =>
  api.patch(`/api/v1/stores/${storeId}/tables/${tableId}/slots/${bookingId}/cancel`);
