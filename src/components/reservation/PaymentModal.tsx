import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { formatKrw } from "@/utils/money";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type PayMethod = "KAKAOPAY" | "TOSSPAY";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
  onSuccess: () => void;
  onBack: () => void;
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
  onBack,
}: Props) {
  const [method, setMethod] = useState<PayMethod | undefined>();
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

  const handleBack = () => {
    onOpenChange(false);
    onBack();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md rounded-2xl p-0 overflow-hidden"
      >
        <DialogHeader className="px-6 py-1 border-b">
          <div className="flex items-start justify-between gap-3 mb-3">
            <DialogTitle className="text-lg">예약금 결제</DialogTitle>
            <button
              type="button"
              onClick={handleBack}
              aria-label="뒤로 가기"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X />
            </button>
          </div>
        </DialogHeader>
        <div className="px-6 py-5 space-y-4">
          <div className="border rounded-xl p-4">
            <div className="text-sm text-muted-foreground">매장</div>
            <div className="mt-1 text-base truncate">{restaurant.name}</div>
          </div>
          <div className="border rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground">결제 금액</div>
              <div className="mt-1 text-xl font-semibold">
                {formatKrw(amount)}원
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">결제수단</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setMethod("KAKAOPAY")}
                className={cn(
                  "h-12 cursor-pointer justify-center rounded-xl",
                  method === "KAKAOPAY" &&
                    "text-black bg-[#FFEB00] hover:bg-[#f2de00]",
                )}
              >
                카카오페이
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMethod("TOSSPAY")}
                className={cn(
                  "h-12 cursor-pointer justify-center rounded-xl",
                  method === "TOSSPAY" &&
                    "text-white bg-[#0064FF] hover:bg-[#005fee] hover:text-white",
                )}
              >
                토스페이
              </Button>
            </div>
          </div>
          <Button
            className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 cursor-pointer "
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
