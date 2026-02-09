import { api } from "../axios";

type ApiEnvelope<T> = {
  isSuccess?: boolean;
  success?: boolean;
  code?: string;
  message?: string;
  result: T;
};

export type PaymentRequestResult = {
  paymentId: number;
  bookingId: number;
  orderId: string;
  amount: number;
  requestedAt: string;
};

export async function requestPayment(body: { bookingId: number }) {
  const res = await api.post<ApiEnvelope<PaymentRequestResult>>(
    "/api/v1/payments/request",
    body,
  );
  return res.data.result;
}

export type PaymentConfirmResult = {
  paymentId: number;
  status: string;
  approvedAt: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  paymentProvider: string;
  receiptUrl: string;
};

export async function confirmPayment(body: {
  paymentKey: string;
  orderId: string;
  amount: number;
}) {
  const res = await api.post<ApiEnvelope<PaymentConfirmResult>>(
    "/api/v1/payments/confirm",
    body,
  );
  return res.data.result;
}
