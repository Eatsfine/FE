import type { ApiResponse } from "@/types/api";
import type { PaymentConfirmResult, PaymentRequestResult } from "@/types/payment";

import { api } from "../axios";

export async function requestPayment(body: { bookingId: number }) {
  const res = await api.post<ApiResponse<PaymentRequestResult>>(`/api/v1/payments/request`, body);
  if (!res.data?.isSuccess) {
    throw {
      status: 0,
      code: res.data?.code,
      message: res.data?.message ?? "결제 요청에 실패했습니다.",
    };
  }
  return res.data.result;
}

export async function confirmPayment(body: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  const res = await api.post<ApiResponse<PaymentConfirmResult>>("/api/v1/payments/confirm", body);
  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message ?? "결제 승인에 실패했습니다.");
  }
  return res.data.result;
}
