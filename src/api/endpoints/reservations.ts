import type { DepositRate } from "@/types/payment";
import { api } from "../axios";
import { mockDepositRateByRestaurantId } from "@/mock/restaurantSetting";

export async function getDepositRate(
  restaurantId: string,
): Promise<DepositRate> {
  return mockDepositRateByRestaurantId[restaurantId] ?? 0.4;
}

type ApiResult<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type GetAvailableTimesParams = {
  storeId: string | number;
  date: string;
  partySize: number;
  isSplitAccepted: boolean;
};

type AvailableTimesResult = {
  availableTimes: string[];
};

export async function getAvailableTimes(
  params: GetAvailableTimesParams,
): Promise<string[]> {
  const { storeId, ...query } = params;

  const { data } = await api.get<ApiResult<AvailableTimesResult>>(
    `/stores/${storeId}/bookings/available-times`,
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

export type SeatsTypes = "WINDOW" | "GENERAL" | string;

export type AvailableTable = {
  tableId: number;
  tableNumber: string;
  tableSeats: number;
  seatsType: SeatsTypes;
  gridX: number;
  gridY: number;
  widthSpan: number;
  heightSpan: number;
};
export type GetAvailableTablesParams = {
  storeId: string | number;
  date: string;
  time: string;
  partySize: number;
  isSplitAccepted: boolean;
  seatsType?: string;
};

type AvailableTablesResult = {
  rows: number;
  cols: number;
  tables: AvailableTable[];
};

export async function getAvailableTables(params: GetAvailableTablesParams) {
  const { storeId, ...query } = params;
  const { data } = await api.get<ApiResult<AvailableTablesResult>>(
    `/stores/${storeId}/bookings/available-tables`,
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

type CreateBookingBody = {
  date: string;
  time: string;
  partySize: number;
  tableIds: number[];
  menuItems: { menuId: number; quantity: number }[];
  isSplitAccepted: boolean;
};

export type CreateBookingResult = {
  bookingId: number;
  status: "PENDING" | "CONFIRMED" | string;
  storeName: string;
  date: string;
  time: string; //일단 18:00:00 이형태 나타날수도있음. 추후 수정부탁.
  partySize: number;
  totalDeposit: number;
  paymentId?: number;
  orderId: string;
};

export async function createBooking(params: {
  storeId: string | number;
  body: CreateBookingBody;
}): Promise<CreateBookingResult> {
  const { storeId, body } = params;
  const { data } = await api.post<ApiResult<CreateBookingResult>>(
    `/stores/${storeId}/bookings`,
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
