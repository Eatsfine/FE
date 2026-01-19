import {
  SEATS,
  type PaymentPolicy,
  type ReservationDraft,
  type Restaurant,
  type SeatLayout,
  type SeatType,
  type TablePref,
} from "@/types/restaurant";
import { useEffect, useMemo, useState } from "react";
import { CalendarIcon, Clock3, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { startOfTodayInKst, toYmd } from "@/utils/date";
import { formatKrw } from "@/utils/money";
import { getMockLayoutByRestaurantId } from "@/mock/seatLayout";
import { getMockAvailableTableIds } from "@/mock/tableAvailability";
import TableMap from "./TableMap";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  initialDraft?: ReservationDraft;
  onClickConfirm: (draft: ReservationDraft) => void;
  onBack: () => void;
};

const PEOPLE = [1, 2, 3, 4, 5, 6, 7, 8];
const TIMES = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export default function ReservationModal({
  open,
  onOpenChange,
  restaurant,
  initialDraft,
  onClickConfirm,
  onBack,
}: Props) {
  const [people, setPeople] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [seatType, setSeatType] = useState<SeatType | null>(null);
  const [tablePref, setTablePref] = useState<TablePref>("split_ok");
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const policy = restaurant.paymentPolicy;

  useEffect(() => {
    if (!open) return;
    if (initialDraft) {
      setPeople(initialDraft.people);
      setDate(initialDraft.date);
      setTime(initialDraft.time);
      setSeatType(initialDraft.seatType);
      setTablePref(initialDraft.tablePref);

      setSelectedTableId((initialDraft as any).tableId ?? null);
    }
  }, [open, initialDraft]);

  // date, time, people바뀌면 테이블 재선택 필요
  useEffect(() => {
    setSelectedTableId(null);
  }, [people, date, time]);

  const todayKst = startOfTodayInKst();

  const paymentDraft: PaymentPolicy = {
    depositRate: policy?.depositRate ?? 0.1,
    depositAmount: policy?.depositAmount ?? 0,
    notice:
      policy?.notice ??
      "예약 확정을 위해 예약금 결제가 필요합니다. (노쇼 방지 목적)",
  };

  // 레이아웃 mock 넣음. (나중에 API로 교체예정)
  const layout: SeatLayout | null = useMemo(() => {
    // 레스토랑 id없으면 name등 다른걸로 매핑하지말고 실제로 식당id가 있어야함.
    // 레스토랑 id가 있다고 가정함.
    // return getMockLayoutByRestaurantId(restaurant.id ?? "r-1");
    // }, [restaurant]);
    return getMockLayoutByRestaurantId("r-1"); //UI테스트 용으로 고정시켜 놓음.
  }, []);

  const dateYmd = date ? toYmd(date) : "";
  const canQueryTables = !!layout && !!date && !!time;

  // date, time 기준가능 mock
  const availableIds = useMemo(() => {
    if (!layout || !date || !time) return new Set<string>();
    const restaurantId = restaurant.id ?? "r-1";
    return getMockAvailableTableIds({
      restaurantId,
      dateYmd,
      time,
      tableIds: layout.tables.map((t) => t.id),
    });
  }, [layout, date, time, dateYmd, restaurant.id]);

  const canSubmit = !!date && !!time && !!selectedTableId && !!seatType;

  const seatTypeExists = useMemo(() => {
    if (!layout) return new Set<SeatType>();
    return new Set(layout.tables.map((t) => t.seatType));
  }, [layout]);

  const seatOptions = useMemo(() => {
    if (!layout) return SEATS;
    return SEATS.filter((s) => seatTypeExists.has(s));
  }, [layout, seatTypeExists]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="식당 예약 모달"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="모달 닫기"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-[92vw] max-w-4xl rounded-2xl bg-white shadow-xl overflow-hidden max-h-[calc(100vh-96px)] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div className="min-w-0">
            <h2 className="text-xl truncate">{restaurant.name} 예약</h2>
            <p className="text-sm text-muted-foreground truncate">
              {restaurant.address}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="상세로 돌아가기"
          >
            <X />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-md mb-3">
              <Users className="h-5 w-5" />
              인원
            </div>

            <div className="flex flex-wrap gap-2">
              {PEOPLE.map((n) => {
                const active = people === n;
                return (
                  <Button
                    key={n}
                    type="button"
                    variant="outline"
                    onClick={() => setPeople(n)}
                    className={cn(
                      "rounded-md py-5 px-4 text-md cursor-pointer border-2",
                      active &&
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500",
                    )}
                  >
                    {n}명
                  </Button>
                );
              })}
            </div>
          </div>
          {/* 날짜 */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-md mb-3">
              <CalendarIcon className="h-5 w-5" />
              날짜
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between rounded-md text-md p-5 border-2 cursor-pointer",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? toYmd(date) : "연도-월-일"}
                  <CalendarIcon className="h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < todayKst} //오늘포함 허용함. 오늘 제외하려면 <=로 변경하기.
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* 시간대 */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-md mb-3">
              <Clock3 className="h-5 w-5" />
              시간대
            </div>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => {
                const active = time === t;
                return (
                  <Button
                    key={t}
                    type="button"
                    variant="outline"
                    onClick={() => setTime(t)}
                    className={cn(
                      "rounded-md py-5 px-4 w-24 text-md cursor-pointer border-2",
                      active &&
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500",
                    )}
                  >
                    {t}
                  </Button>
                );
              })}
            </div>
          </div>
          {/* 좌석 유형 */}
          <div className="mt-6 space-y-2">
            <div className="text-md mb-3">좌석 유형</div>
            <div className="flex flex-wrap gap-2">
              {seatOptions.map((s) => {
                const active = seatType === s;
                const exists = seatTypeExists.has(s);
                return (
                  <Button
                    key={s}
                    type="button"
                    variant="outline"
                    disabled={!exists}
                    onClick={() => {
                      setSeatType(s);
                      setSelectedTableId(null);
                    }}
                    className={cn(
                      "rounded-md p-6 w-40 text-md cursor-pointer border-2",
                      active &&
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500",
                    )}
                  >
                    {s}
                  </Button>
                );
              })}
            </div>
          </div>
          {/* 테이블 배치도 */}
          <div className="mt-6 space-y-2">
            <div className="mb-3">테이블 선택</div>
            {!layout && (
              <p className="text-sm text-muted-foreground">
                테이블 배치 정보가 없어요. (백엔드 연결필요)
              </p>
            )}
            {layout && !canQueryTables && (
              <p className="text-sm text-muted-foreground">
                날짜와 시간대를 선택하면 테이블 선택 가능합니다.
              </p>
            )}
            {layout && canQueryTables && (
              <>
                <TableMap
                  layout={layout}
                  availableIds={availableIds}
                  selectedTableId={selectedTableId}
                  seatType={seatType}
                  onSelectTable={setSelectedTableId}
                  onSelectSeatType={setSeatType}
                />

                {!selectedTableId && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    배치도에서 테이블을 선택해주세요
                  </p>
                )}
              </>
            )}
          </div>

          {/* 테이블 선호도 */}
          <div className="mt-6 space-y-2">
            <div className="text-md mb-3">테이블 선호도</div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setTablePref("split_ok")}
                className={cn(
                  "w-full rounded-lg border p-4 text-left cursor-pointer hover:bg-gray-50",
                  tablePref === "split_ok",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-4 inline-flex h-5 w-5 items-center justify-center rounded-full border">
                    {tablePref === "split_ok" ? (
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                    ) : null}
                  </span>
                  <div>
                    <div className="text-md font-medium">
                      테이블 떨어져도 상관없어요
                    </div>
                    <div className="text-sm text-muted-foreground">
                      인원이 많을 경우 여러 테이블로 나누어 앉을 수 있습니다
                    </div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setTablePref("one_table")}
                className={cn(
                  "w-full rounded-lg border p-4 text-left cursor-pointer hover:bg-gray-50",
                  tablePref === "one_table",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-4 inline-flex h-5 w-5 items-center justify-center rounded-full border">
                    {tablePref === "one_table" ? (
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                    ) : null}
                  </span>
                  <div>
                    <div className="text-md">한 테이블에서만 먹을거에요</div>
                    <div className="text-sm text-muted-foreground">
                      모든 인원이 같은 테이블에 앉습니다
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* 결제 유형 */}
          <div className="mt-6 space-y-2">
            <div className="text-md">결제 유형</div>
            <div className="rounded-lg p-4 text-md border-2 border-blue-500 text-blue-500 bg-blue-50 space-y-1">
              <div className="flex items-center justify-between">
                <span>사전결제</span>
                <span className="font-semibold">
                  예약금: {formatKrw(paymentDraft.depositAmount)}원
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                예약 확정을 위해 예약금 결제가 필요합니다.{" "}
                {paymentDraft.depositRate
                  ? `(${Math.round(paymentDraft.depositRate * 100)}% 정책 적용)`
                  : null}
              </p>
              <p className="text-xs text-muted-foreground">
                {paymentDraft.notice}
              </p>
            </div>
          </div>

          {/* 예약 확인 모달 이동 */}
          <Button
            className="mt-5 text-md h-14 w-full rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600"
            disabled={!canSubmit}
            onClick={() => {
              if (!date || !time || !selectedTableId || !seatType) return;
              onClickConfirm({
                people,
                date,
                time,
                seatType,
                tablePref,
                payment: paymentDraft,
                tableId: selectedTableId,
              });
            }}
          >
            예약 진행
          </Button>
          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              날짜/시간대/테이블을 선택하면 예약할 수 있어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
