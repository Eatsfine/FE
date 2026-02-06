import type { CreateBookingResult } from "@/api/endpoints/reservations.ts";
import { useConfirmClose } from "@/hooks/common/useConfirmClose";
import { useCreateBooking } from "@/hooks/reservation/useCreateBooking";
import { useDepositRate } from "@/hooks/reservation/useDepositRate";
import { useMenus } from "@/hooks/reservation/useMenus";
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
  onConfirm: (bookingResult: CreateBookingResult) => void;
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
  console.log(
    "[confirm] darft.tableId=",
    draft.tableId,
    "tableIdNum=",
    Number(draft.tableId),
  );
  console.log("[confirm] request body tableIds=", [Number(draft.tableId)]);
  const createBookingMutation = useCreateBooking();
  const menusQuery = useMenus(restaurant.id);
  const depositQuery = useDepositRate(restaurant.id);
  const handleRequestClose = useConfirmClose(onClose);

  const { people, date, time, seatType, tablePref } = draft;
  const isSplitAccepted = tablePref === "split_ok";

  const menus = menusQuery.activeMenus ?? [];
  const selectedMenus = draft.selectedMenus ?? [];
  const menuTotal = calcMenuTotal(menus, selectedMenus);
  const rate = depositQuery.rate;
  const depositAmount = calcDeposit(menuTotal, rate);

  const layout = getMockLayoutByRestaurantId(restaurant.id ?? "1");

  const seatTable = layout?.tables.find(
    (t) => String(t.id) === String(draft.tableId),
  );

  const isCalculating = menusQuery.isLoading || depositQuery.isLoading;

  if (!open) return null;

  const onClickConfirm = async () => {
    const tableId = Number(draft.tableId);
    if (!restaurant.id) return;
    if (createBookingMutation.isPending) return;
    if (!Number.isFinite(tableId) || tableId <= 0) {
      alert("테이블을 먼저 선택해주세요");
      return;
    }
    const body = {
      date: toYmd(draft.date),
      time: draft.time,
      partySize: draft.people,
      tableIds: [tableId],
      menuItems: (draft.selectedMenus ?? []).map((m) => ({
        menuId: Number(m.menuId),
        quantity: m.quantity,
      })),
      isSplitAccepted,
    };

    const result = await createBookingMutation.mutateAsync({
      storeId: restaurant.id,
      body,
    });

    onConfirm(result);
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
              예약금:{" "}
              {isCalculating ? "계산중 .." : `${formatKrw(depositAmount)}원`}
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
              onClick={onClickConfirm}
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending
                ? "예약 생성중"
                : "예약금 결제하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
