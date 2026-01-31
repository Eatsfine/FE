import type { ReservationDraft, Restaurant } from "@/types/restaurant";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  onConfirm: (draft: ReservationDraft) => void;
  onBack: () => void;
  draft: ReservationDraft;
};

export default function ReservationMenuModal({
  open,
  onOpenChange,
  restaurant,
  onConfirm,
  onBack,
  draft,
}: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="식당 예약 모달"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="모달 닫기"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-[92vw] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2>{restaurant.name} 메뉴선택</h2>
          <button
            type="button"
            className="px-3 py-2 rounded-lg hover:bg-gray-100"
            onClick={onBack}
          >
            뒤로
          </button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">메뉴선택UI</p>
        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-blue-500 text-white py-3 hover:bg-blue-600"
          onClick={() => onConfirm(draft)}
        >
          다음
        </button>
      </div>
    </div>
  );
}
