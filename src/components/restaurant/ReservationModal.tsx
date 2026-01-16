import {
  SEATS,
  type ReservationDraft,
  type Restaurant,
  type SeatType,
  type TablePref,
} from "@/types/restaurant";
import { useEffect, useState } from "react";
import { CalendarIcon, Clock3, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { toYmd } from "@/utils/reservation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
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
  onClickConfirm,
  onBack,
}: Props) {
  const [people, setPeople] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [seatType, setSeatType] = useState<SeatType>("일반석");
  const [tablePref, setTablePref] = useState<TablePref>("split_ok");
  // const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPeople(2);
    setDate(undefined);
    setTime("");
    setSeatType("일반석");
    setTablePref("split_ok");
  }, [open]);

  const canSubmit = !!date && !!time;

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
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500"
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
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? toYmd(date) : "연도-월-일"}
                  <CalendarIcon className="h-4 w-4 opacity-70" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
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
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500"
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
              {SEATS.map((s) => {
                const active = seatType === s;
                return (
                  <Button
                    key={s}
                    type="button"
                    variant="outline"
                    onClick={() => setSeatType(s)}
                    className={cn(
                      "rounded-md p-6 w-40 text-md cursor-pointer border-2",
                      active &&
                        "border-blue-500 text-blue-500 bg-gray-100 hover:bg-gray-100 hover:text-blue-500"
                    )}
                  >
                    {s}
                  </Button>
                );
              })}
            </div>
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
                  tablePref === "split_ok"
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
                  tablePref === "one_table"
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
            <div className="rounded-lg p-4 text-md border-2 border-blue-500 text-blue-500 bg-blue-50">
              사전결제
              <p className="text-sm text-muted-foreground">
                결제는 예약 확정 단계에서 진행됩니다.
              </p>
            </div>
          </div>

          {/* 예약 완료 */}
          <Button
            className="mt-5 text-md h-14 w-full rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600"
            disabled={!canSubmit}
            onClick={() => {
              if (!date || !time) return;
              onClickConfirm({ people, date, time, seatType, tablePref });
            }}
          >
            예약 완료
          </Button>
          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              날짜와 시간대를 선택하면 예약할 수 있어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
