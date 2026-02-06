import { api } from "../axios";

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
