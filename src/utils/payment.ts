import type { DepositRate } from "@/types/payment";

export function calcDeposit(totalPrice: number, rate: DepositRate) {
  return Math.round(totalPrice * rate);
}
