export type { DepositRate } from "@/types/store";

export type PaymentRequestResult = {
  paymentId: number;
  bookingId: number;
  orderId: string;
  amount: number;
  requestedAt: string;
};

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
