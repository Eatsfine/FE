import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatKrw } from "@/utils/money";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useMenus } from "@/hooks/reservation/useMenus";
import { useDepositRate } from "@/hooks/reservation/useDepositRate";
import { calcMenuTotal } from "@/utils/menu";
import { useConfirmClose } from "@/hooks/common/useConfirmClose";
import type { CreateBookingResult } from "@/api/endpoints/reservations";
import { requestPayment } from "@/api/endpoints/payments";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
  booking: CreateBookingResult | null;
};

export default function PaymentModal({
  open,
  onClose,
  onOpenChange,
  onBack,
  restaurant,
  draft,
  booking,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  const { menus } = useMenus(restaurant.id);
  const { rate } = useDepositRate(restaurant.id);

  const menuTotal = useMemo(() => {
    return calcMenuTotal(menus, draft.selectedMenus);
  }, [menus, draft.selectedMenus]);

  const amount = booking?.totalDeposit ?? 0;

  const widgetsRef = useRef<any>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    if (!booking) return;

    if (renderedRef.current) {
      setWidgetReady(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setWidgetReady(false);
        const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY as
          | string
          | undefined;
        if (!clientKey) throw new Error("VITE_TOSS_CLIENT_KEY가 없습니다.");

        const tossPayments = await loadTossPayments(clientKey);

        const widgets = (tossPayments as any).widgets({
          customerKey: "ANONYMOUS",
        });

        await widgets.setAmount({
          currency: "KRW",
          value: amount,
        });

        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });
        if (cancelled) return;

        widgetsRef.current = widgets;
        renderedRef.current = true;
        setWidgetReady(true);
      } catch (e) {
        console.error(e);
        setWidgetReady(false);
        alert(
          e instanceof Error ? e.message : "결제 위젯 로딩에 실패했습니다.",
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, booking, amount]);

  const onClickPay = async () => {
    if (loading) return;
    if (!amount) return;
    if (!booking) return;
    setLoading(true);
    try {
      const payOrder = await requestPayment({
        bookingId: booking.bookingId,
      });
      if (!payOrder?.orderId || !payOrder?.amount) {
        throw new Error("결제 주문 생성 결과가 올바르지 않습니다.");
      }
      if (payOrder.amount <= 0) {
        throw new Error("결제 금액이 0원이라 결제를 진행할 수 없습니다.");
      }
      const widgets = widgetsRef.current;
      if (!widgets) throw new Error("결제 위젯이 준비되지 않았습니다.");

      await widgets.setAmount({
        currency: "KRW",
        value: payOrder.amount,
      });

      await widgets.requestPayment({
        orderId: payOrder.orderId,
        orderName: `${restaurant.name} 예약금`,
        successUrl: `${window.location.origin}/payment/success?bookingId=${booking.bookingId}`,
        failUrl: `${window.location.origin}/payment/fail?bookingId=${booking.bookingId}`,
      });
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "결제 요청에 실패했습니다.");
      // TODO: toast로 사용자 안내() sonner라는 UI팝업 라이브러리 사용할지 논의필요함.
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClose = useConfirmClose(onClose);

  const handleBack = () => {
    onOpenChange(false);
    onBack();
  };
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
            <div className="text-sm text-muted-foreground">결제 금액</div>
            <div className="mt-1 text-xl font-semibold">
              {formatKrw(amount)}원
            </div>
            <p className="text-xs text-muted-foreground">
              메뉴 총액 {formatKrw(menuTotal)}원 * {Math.round(rate * 100)}%
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-sm">결제수단</div>
            <div id="payment-method" className="border rounded-xl p-3" />
            <div className="text-sm">약관</div>
            <div id="agreement" className="border rounded-xl p-3" />
            {!widgetReady ? (
              <p className="text-sm text-gray-500">결제 위젯 로딩중..</p>
            ) : null}
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              className="flex-1 h-12 rounded-xl cursor-pointer"
              onClick={handleBack}
            >
              이전
            </Button>
            <Button
              type="button"
              className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 cursor-pointer "
              disabled={loading || !widgetReady}
              onClick={onClickPay}
            >
              {loading ? "결제 진행중.." : "결제하기"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            현재는 임시 결제(테스트)입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
