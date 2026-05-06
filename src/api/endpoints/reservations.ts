import type { ApiResponse } from "@/types/api";
import type {
  AvailableTablesResult,
  AvailableTimesResult,
  CreateBookingBody,
  CreateBookingResult,
  GetAvailableTablesParams,
  GetAvailableTimesParams,
} from "@/types/reservation";

import { api } from "../axios";

export async function getAvailableTimes(params: GetAvailableTimesParams): Promise<string[]> {
  const { storeId, ...query } = params;

  const { data } = await api.get<ApiResponse<AvailableTimesResult>>(
    `/api/v1/stores/${storeId}/bookings/available-times`,
    { params: query },
  );

  if (!data?.isSuccess) {
    throw {
      status: 0,
      code: data?.code,
      message: data?.message ?? "예약 가능 시간 조회에 실패했습니다.",
    };
  }
  return data.result?.availableTimes ?? [];
}

export async function getAvailableTables(params: GetAvailableTablesParams) {
  const { storeId, ...query } = params;
  const { data } = await api.get<ApiResponse<AvailableTablesResult>>(
    `/api/v1/stores/${storeId}/bookings/available-tables`,
    { params: query },
  );

  if (!data.isSuccess) {
    throw {
      status: 0,
      code: data?.code,
      message: data?.message ?? "예약 가능 테이블 조회를 실패하였습니다.",
    };
  }
  return data.result;
}

export async function createBooking(params: {
  storeId: string | number;
  body: CreateBookingBody;
}): Promise<CreateBookingResult> {
  const { storeId, body } = params;
  const { data } = await api.post<ApiResponse<CreateBookingResult>>(
    `/api/v1/stores/${storeId}/bookings`,
    body,
  );

  if (!data?.isSuccess) {
    throw {
      status: 0,
      code: data?.code,
      message: data?.message ?? "예약 생성에 실패했습니다.",
    };
  }
  return data.result;
}
