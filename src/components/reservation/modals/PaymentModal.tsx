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
import type { CreateBookingResult } from "@/api/endpoints/reservations";
import { requestPayment } from "@/api/endpoints/payments";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

type PayMethod = "KAKAOPAY" | "TOSSPAY";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
  booking: CreateBookingResult | null;
};

function toTossPayType(method: PayMethod) {
  return method === "KAKAOPAY" ? "카카오페이" : "토스페이";
}

export default function PaymentModal({
  open,
  onClose,
  onOpenChange,
  onBack,
  restaurant,
  draft,
  booking,
}: Props) {
  const [method, setMethod] = useState<PayMethod | undefined>();
  const [loading, setLoading] = useState(false);

  const { menus } = useMenus(restaurant.id);
  const { rate } = useDepositRate(restaurant.id);

  const menuTotal = useMemo(() => {
    return calcMenuTotal(menus, draft.selectedMenus);
  }, [menus, draft.selectedMenus]);

  console.log("[payment booking]", booking);
  console.log("[payment amount]", booking?.totalDeposit);
  console.log("[payment rate(mock)]", rate);
  console.log("[payment menuTotal]", menuTotal);

  const amount = booking?.totalDeposit;

  const onClickPay = async () => {
    if (loading) return;
    if (!method) return;
    if (!amount) return;
    if (!booking) return;
    setLoading(true);
    try {
      // 1. 백엔드 결제 주문 생성 (엔드포이트.필드명은 aPI 명세서에 맞춰서 주문번호 등 받기)
      const payOrder = await requestPayment({
        bookingId: booking.bookingId,
      });

      // 2.토스페이먼츠 sDK 로드
      const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY as
        | string
        | undefined;
      if (!clientKey) throw new Error("VITE_TOSS_CLIENT_KEY가 없습니다.");

      const tossPayments = await loadTossPayments(clientKey);

      // 3. 선택한 결제수단으로 결제창 요청 (리다이렉트 발생)
      await tossPayments.requestPayment(toTossPayType(method), {
        amount: payOrder.amount,
        orderId: payOrder.orderId,
        orderName: `${restaurant.name} 예약금`,
        successUrl: `${window.location.origin}/payment/success?bookingId=${booking.bookingId}`,
        failUrl: `${window.location.origin}/payment/fail?bookingId=${booking.bookingId}`,
      });
    } catch (e) {
      console.error(e);
      // TODO: toast로 사용자 안내() sonner라는 UI팝업 라이브러리 사용할지 논의필요함.
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
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="flex-1 h-12 rounded-xl cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                onBack();
              }}
            >
              이전
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 cursor-pointer "
              disabled={loading || !method}
              onClick={onClickPay}
            >
              {" "}
              {loading ? "결제 진행중.." : "결제하기"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            현재는 임시 결제입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
