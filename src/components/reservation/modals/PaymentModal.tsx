import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { useMemo, useState } from "react";
import { formatKrw } from "@/utils/money";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMenus } from "@/hooks/reservation/useMenus";
import { useDepositRate } from "@/hooks/reservation/useDepositRate";
import { calcMenuTotal } from "@/utils/menu";
import { useConfirmClose } from "@/hooks/common/useConfirmClose";

type PayMethod = "KAKAOPAY" | "TOSSPAY";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
  onSuccess: () => void;
  booking: { bookingId: number; orderId: string; totalDeposit: number };
};

function mockPay(method: PayMethod, amount: number) {
  // TODO: 실제 연동할때 토스페이먼츠/카카오페이 SDK 호출로 교체하기
  return new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), 800);
  });
}

export default function PaymentModal({
  open,
  onClose,
  onOpenChange,
  restaurant,
  draft,
  onSuccess,
  booking,
}: Props) {
  const [method, setMethod] = useState<PayMethod | undefined>();
  const [loading, setLoading] = useState(false);

  const { menus } = useMenus(restaurant.id);
  const { rate } = useDepositRate(restaurant.id);

  const menuTotal = useMemo(() => {
    return calcMenuTotal(menus, draft.selectedMenus);
  }, [menus, draft.selectedMenus]);

  // const amount = useMemo(() => {
  //   return calcDeposit(menuTotal, rate);
  // }, [menuTotal, rate]);
  const amount = booking.totalDeposit;

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

  const handleRequestClose = useConfirmClose(onClose);
  if (!open) return null;
  if (!restaurant || !draft) return null;
  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="예약 내용 확인모달"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="모달 닫기"
        onClick={handleRequestClose}
      />
      <div className="relative z-10 w-[92vw] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg">예약금 결제</h3>
          <button
            type="button"
            onClick={handleRequestClose}
            aria-label="닫기"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {" "}
            <X />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="border rounded-xl p-4">
            <div className="text-sm text-muted-foreground">매장</div>
            <div className="mt-1 text-base truncate">{restaurant.name}</div>
          </div>
          <div className="border rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-muted-foreground">결제 금액</div>
                <div className="mt-1 text-xl font-semibold">
                  {formatKrw(amount)}원
                </div>
                <p className="text-sm text-muted-foreground">
                  주문번호: {booking.orderId}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              메뉴 총액 {formatKrw(menuTotal)}원 * {Math.round(rate * 100)}%
            </p>
          </div>
          {/* 본문 */}
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
      </div>
    </div>
  );
}
