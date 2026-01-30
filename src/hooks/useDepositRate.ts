import { mockDepositRateByRestaurantId } from "@/mock/restaurantSetting";
import type { DepositRate } from "@/types/payment";
import { useMemo } from "react";

export function useDepositRate(restaurantId: string) {
  const rate: DepositRate = useMemo(() => {
    return mockDepositRateByRestaurantId[restaurantId] ?? 0.3;
  }, [restaurantId]);

  return { rate };
}
