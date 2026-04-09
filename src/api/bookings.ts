import { api } from "./axios";

type ApiBookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";

interface Booking {
  bookingId: number;
  storeName: string;
  storeAddress: string;
  bookingDate: string;
  bookingTime: string;
  partySize: number;
  tableNumbers: string;
  amount: number | null;
  paymentMethod: string;
  status: ApiBookingStatus;
}

interface BookingResponse {
  bookingList: Booking[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

type GetBookingParams = {
  page: number;
  status?: ApiBookingStatus;
};

export const getBookings = async (
  status?: ApiBookingStatus,
  page: number = 1,
): Promise<BookingResponse> => {
  const params: GetBookingParams = { page };
  if (status) params.status = status;

  const response = await api.get<{ result: BookingResponse }>(
    "/api/v1/users/bookings",
    { params },
  );
  return response.data.result as BookingResponse;
};

export const cancelBooking = async (
  bookingId: number,
  reason: string = "사용자 취소",
) => {
  const response = await api.patch(`/api/v1/bookings/${bookingId}/cancel`, {
    reason,
  });
  return response.data;
};
