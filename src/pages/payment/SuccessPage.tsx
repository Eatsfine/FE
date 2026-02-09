import { confirmPayment } from "@/api/endpoints/payments";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SuccessPage() {
  const [sp] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const paymentKey = sp.get("paymentKey");
    const orderId = sp.get("orderId");
    const amountStr = sp.get("amount");
    const bookingId = sp.get("bookingId");

    if (!paymentKey || !orderId || !amountStr) {
      nav("/payment/fail", { replace: true });
      return;
    }
    const amount = Number(amountStr);
    if (!Number.isFinite(amount)) {
      nav("/payment/fail", { replace: true });
      return;
    }

    (async () => {
      try {
        await confirmPayment({ paymentKey, orderId, amount });
        // 일단 목록페이지 하이라이트로 보냄. 아예 상세로 보낼지 의논 필요.
        if (bookingId) {
          nav(`/mypage/reservations?height=${bookingId}`, { replace: true });
        }
        nav("/mypage/reservations", { replace: true });
      } catch (e) {
        console.error(e);
        nav("/payment/fail", { replace: true });
      }
    })();
  }, [sp, nav]);
  return <div className="p-6">결제 승인 처리중..</div>;
}
