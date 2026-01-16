import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { toYmd } from "@/utils/date";
import { formatKrw } from "@/utils/money";
import { tablePrefLabel } from "@/utils/reservation";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
  restaurant: Restaurant;
  draft: ReservationDraft;
};

export default function ReservationConfirmMoodal({
  open,
  onClose,
  onBack,
  onConfirm,
  restaurant,
  draft,
}: Props) {
  if (!open) return null;

  const { people, date, time, seatType, tablePref } = draft;

  const handleRequestClose = () => {
    const ok = window.confirm(
      "예약이 확정되지 않았습니다.\n예약화면을 벗어나시겠습니까?"
    );
    if (ok) onClose();
  };

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
      <div className="relative z-10 w-[92vw] max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg">예약 내용 확인</h3>
          <button type="button" onClick={handleRequestClose} aria-label="닫기">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">식당</div>
            <div>{restaurant.name}</div>
            <div className="text-sm text-gray-600">{restaurant.address}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500">날짜</div>
              <div>{toYmd(date)}</div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500">시간</div>
              <div>{time}</div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500">인원</div>
              <div>{people}명</div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500">좌석</div>
              <div>{seatType}</div>
            </div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">테이블 선호도</div>
            <div>{tablePrefLabel(tablePref)}</div>
          </div>
          <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
            <div className="text-sm text-gray-500">결제 유형</div>
            <div className="text-blue-700">사전 결제</div>
            <div className="text-sm text-gray-800 mt-1">
              예약금: {formatKrw(draft.payment.depositAmount)}원
              {draft.payment.depositRate
                ? ` (${Math.round(draft.payment.depositRate * 100)}% 정책 적용)`
                : null}
            </div>
          </div>
          <p className="text-gray-700 text-center">
            위 내용으로 예약을 진행할까요?
          </p>
          <div className="flex gap-3">
            <button
              className="flex-1 border rounded-xl py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              type="button"
              onClick={onBack}
            >
              수정하기
            </button>
            <button
              className="flex-1 border rounded-xl py-3 text-white bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
              type="button"
              onClick={onConfirm}
            >
              예약금 결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
