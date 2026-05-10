import type { ApiResponse } from "@/types/api";
import type { UserBookingsResult } from "@/types/booking";

import { api } from "../axios";

export async function getUserBookings(page = 1) {
  const res = await api.get<ApiResponse<UserBookingsResult>>(`/api/v1/users/bookings?page=${page}`);
  return res.data.result;
}
