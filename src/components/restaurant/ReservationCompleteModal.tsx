import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { toYmd } from "@/utils/reservation";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  restaurant: Restaurant;
  draft: ReservationDraft;
  onClose: () => void;
  autoCloseMs?: number;
};

export default function ReservationCompleteModal({
  open,
  restaurant,
  draft,
  onClose,
  autoCloseMs = 5000, //5초뒤 닫기
}: Props) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => window.clearTimeout(t);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  const { people, date, time } = draft;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="예약 확정 모달"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="모달 닫기"
        onClick={onClose}
      />
      <div className="relative z-10 w-[92vw] max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col items-center justify-between p-8 space-y-4">
          <CircleCheck className="h-25 w-25 text-green-400" />
          <p className="text-2xl mt-2">예약이 완료되었습니다!</p>
          <div className="text-center text-gray-500">
            <p>{restaurant.name}</p>
            <p>{toYmd(date)}</p>
            <div className="flex justify-center gap-4">
              <p>{time}</p>
              <p>{people}명</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
