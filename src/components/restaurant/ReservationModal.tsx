import type { Restaurant } from "@/types/restaurant";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { CalendarIcon, Users, X } from "lucide-react";

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
          <DialogHeader>
            <DialogTitle>{restaurant.name} 예약</DialogTitle>
          </DialogHeader>

          <Button>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div>
          <div>
            <div>
              <Users className="h-4 w-4" />
              인원
            </div>

            <div>
              {PEOPLE.map((n) => {
                const active = people === n;
                return (
                  <Button
                    key={n}
                    type="button"
                    variant="outline"
                    onClick={() => setPeople(n)}
                  >
                    {n}명
                  </Button>
                );
              })}
            </div>
          </div>
          {/* 날짜 */}
          <div>
            <div>
              <CalendarIcon className="h-4 w-4" />
              날짜
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
