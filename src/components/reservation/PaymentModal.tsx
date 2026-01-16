import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { formatKrw } from "@/utils/money";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type PayMethod = "KAKAOPAY" | "TOSSPAY";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
  onSuccess: () => void;
};

function mockPay(method: PayMethod, amount: number) {
  // TODO: 실제 연동할때 토스페이먼츠/카카오페이 SDK 호출로 교체하기
  return new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), 800);
  });
}

export default function PaymentModal({
  open,
  onOpenChange,
  restaurant,
  draft,
  onSuccess,
}: Props) {
  const [method, setMethod] = useState<PayMethod>("KAKAOPAY");
  const [loading, setLoading] = useState(false);

  const amount = useMemo(() => draft.payment.depositAmount, [draft.payment]);

  const onClickPay = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await mockPay(method, amount);
      onOpenChange(false);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>예약금 결제</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <div>매장</div>
            <div>{restaurant.name}</div>
          </div>
          <div>
            <div>
              <div>결제 금액</div>
              <div>{formatKrw(amount)}원</div>
            </div>
            <div>
              {draft.payment.depositRate
                ? `${Math.round(draft.payment.depositRate * 100)}% 정책`
                : null}
            </div>
          </div>
          <div>
            <div>결제수단</div>
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMethod("KAKAOPAY")}
                className={cn(
                  "h-12 cursor-pointer",
                  method === "KAKAOPAY" &&
                    "border-blue-500 text-blue-600 bg-blue-50"
                )}
              >
                카카오페이
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMethod("TOSSPAY")}
                className={cn(
                  "h-12 cursor-pointer",
                  method === "TOSSPAY" &&
                    "border-blue-500 text-blue-600 bg-blue-50"
                )}
              >
                토스페이
              </Button>
            </div>
          </div>
          <Button
            className="w-full cursor-pointer"
            disabled={loading}
            onClick={onClickPay}
          >
            {" "}
            {loading ? "결제 진행중.." : "결제하기"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            현재는 임시 결제입니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
