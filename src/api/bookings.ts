import type { ApiBookingStatus, BookingResponse, GetBookingParams } from "@/types/booking";

import { api } from "./axios";

export const getBookings = async (
  status?: ApiBookingStatus,
  page: number = 1,
): Promise<BookingResponse> => {
  const params: GetBookingParams = { page };
  if (status) params.status = status;

  const response = await api.get<{ result: BookingResponse }>("/api/v1/users/bookings", { params });
  return response.data.result as BookingResponse;
};

export const cancelBooking = async (bookingId: number, reason: string = "사용자 취소") => {
  const response = await api.patch(`/api/v1/bookings/${bookingId}/cancel`, {
    reason,
  });
  return response.data;
};
