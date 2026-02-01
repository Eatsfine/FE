import { useDepositRate } from "@/hooks/useDepositRate";
import { useMenus } from "@/hooks/useMenus";
import { getMockLayoutByRestaurantId } from "@/mock/seatLayout";
import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import { toYmd } from "@/utils/date";
import { calcMenuTotal } from "@/utils/menu";
import { formatKrw } from "@/utils/money";
import { calcDeposit } from "@/utils/payment";
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

  //UI테스트를 위해서 r-1로 고정함. 나중에 백엔드 연결시 주석으로 변경필요. ReservationModal또한 변경필요.
  // const layout = getMockLayoutByRestaurantId(restaurant.id ?? "r-1");
  const layout = getMockLayoutByRestaurantId("1");

  const seatTable = layout?.tables.find((t) => t.id === draft.tableId);

  const handleRequestClose = () => {
    const ok = window.confirm(
      "예약이 확정되지 않았습니다.\n예약화면을 벗어나시겠습니까?",
    );
    if (ok) onClose();
  };

  const { menus } = useMenus(restaurant.id);
  const { rate } = useDepositRate(restaurant.id);
  const { selectedMenus } = draft;
  const menuTotal = calcMenuTotal(menus, selectedMenus);
  const depositAmount = calcDeposit(menuTotal, rate);

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
          <h3 className="text-lg">예약 내용 확인</h3>
          <button
            type="button"
            onClick={handleRequestClose}
            aria-label="닫기"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X />
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
              <div>
                {seatType}, {seatTable?.tableNo}번
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">테이블 선호도</div>
            <div>{tablePrefLabel(tablePref)}</div>
          </div>
          <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
            <div className="text-sm text-gray-500">결제 유형</div>
            <div className="text-blue-700">사전 결제</div>
            <div className="text-gray-800 mt-1 font-semibold">
              예약금: {formatKrw(depositAmount)}원
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {restaurant.paymentPolicy?.notice ??
                "예약 확정을 위해 예약금 결제가 필요합니다.(노쇼 방지 목적)"}
            </p>
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
