import type { Restaurant } from "@/types/restaurant";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { CalendarIcon, Clock3, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SeatType = "일반석" | "창가석" | "룸/프라이빗" | "바(Bar)석" | "야외석";
type TablePref = "split_ok" | "one_table";
// type PayType = "사전결제" | "현장결제";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
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

const SEATS: SeatType[] = [
  "일반석",
  "창가석",
  "룸/프라이빗",
  "바(Bar)석",
  "야외석",
];

export default function ReservationModal({
  open,
  onOpenChange,
  restaurant,
  onBack,
}: Props) {
  const [people, setPeople] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [seatType, setSeatType] = useState<SeatType>("일반석");
  const [tablePref, setTablePref] = useState<TablePref>("split_ok");
  const payType = "사전결제";

  useEffect(() => {
    if (!open) return;
    setPeople(2);
    setDate(undefined);
    setTime("");
    setSeatType("일반석");
    setTablePref("split_ok");
  }, [open]);

  const canSubmit = !!date && !!time;

  const handleSubmit = () => {
    if (!canSubmit) return;

    //TODO: 예약 API 붙이기 전에 임시 확인용임.
    console.log({
      restaurantId: restaurant.id,
      people,
      date: date, //? format(date, "yyyy-MM-dd"): null
      time,
      seatType,
      tablePref,
    });
    //TODO: 예약완료후 모달로 바꾸기. 혹은, alert로 확인한번하고 진행하는걸로 바꾸기
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onOpenChange(false);
      }}
    >
      <DialogContent className="max-w-[760px] p-0">
        {/* 헤더부분 */}
        <div className="flex items-start justify-between px-6 pt-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold">
              {restaurant.name} 예약
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {restaurant.address}
            </p>
          </DialogHeader>

          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mt-1"
            aria-label="상세로 돌아가기"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-6 pb-6">
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4" />
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
                      "h-9 rounded-md px-3 text-sm",
                      active && "border-primary text-primary"
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
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CalendarIcon className="h-4 w-4" />
              날짜
            </div>
            {/* 날짜 부분 keep */}
          </div>
          {/* 시간대 */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock3 className="h-4 w-4" />
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
                      "h-9 w-[74px] rounded-md px-0 text-sm",
                      active && "border-primary text-primary"
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
            <div className="text-sm font-semibold">좌석 유형</div>
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
                      "h-9 rounded-md px-4 text-sm",
                      active && "border-primary text-primary"
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
            <div className="text-sm font-semibold">테이블 선호도</div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setTablePref("split_ok")}
                className={cn(
                  "w-full rounded-lg border p-4 text-left",
                  tablePref === "split_ok" && "border-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border">
                    {tablePref === "split_ok" ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    ) : null}
                  </span>
                  <div>
                    <div className="text-sm font-medium">
                      테이블 떨어져도 상관없어요
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      인원이 많을 경우 여러 테이블로 나누어 앉을 수 있습니다
                    </div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setTablePref("one_table")}
                className={cn(
                  "w-full rounded-lg border p-4 text-left",
                  tablePref === "one_table" && "border-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border">
                    {tablePref === "one_table" ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    ) : null}
                  </span>
                  <div>
                    <div className="text-sm font-medium">
                      한 테이블에서만 먹을거에요
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      모든 인원이 같은 테이블에 앉습니다
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
          {/* 결제 유형 */}
          <div>{/* 결제 유형 keep */}</div>
          {/* Separator */}

          {/* 예약 완료 */}
          <Button
            className="h-11 w-full rounded-lg"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            예약 완료
          </Button>
          {!canSubmit && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              날짜와 시간대를 선택하면 예약할 수 있어요.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
