import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getUserBookings } from "@/api/endpoints/bookings";
import ReservationCompleteModal from "@/components/reservation/modals/ReservationCompleteModal";
import type { UserBookingItem } from "@/types/booking";
import { toHHmm } from "@/utils/time";

export default function ReservationCompletePage() {
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const bookingIdStr = sp.get("bookingId");
  const bookingId = bookingIdStr ? Number(bookingIdStr) : NaN;

  const [open, setOpen] = useState(true);
  const [item, setItem] = useState<UserBookingItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(bookingId)) {
      nav("/mypage/reservations", { replace: true });
      return;
    }

    (async () => {
      try {
        setLoading(true);
        let page = 1;
        while (true) {
          const data = await getUserBookings(page);

          const found = data.bookingList.find((b) => b.bookingId === bookingId);
          if (found) {
            setItem(found);
            break;
          }
          if (data.isLast) break;
          page += 1;
        }
      } catch (e) {
        console.error(e);
        alert(e instanceof Error ? e.message : JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId, nav]);

  const handleClose = () => {
    setOpen(false);
    if (Number.isFinite(bookingId)) {
      nav(`/mypage/reservations?highlight=${bookingId}`, { replace: true });
    } else {
      nav(`/mypage/reservations`, { replace: true });
    }
  };

  const restaurant = useMemo(() => {
    return { id: 0, name: item?.storeName ?? "예약완료" };
  }, [item]);
  const draft = useMemo(() => {
    if (!item) return { people: 0, date: new Date(), time: "" };
    const date = new Date(`${item.bookingDate}T00:00:00`);
    const time = toHHmm(item.bookingTime) ?? "";
    return { people: item.partySize, date, time };
  }, [item]);

  return (
    <>
      <ReservationCompleteModal
        open={open}
        restaurant={restaurant}
        draft={draft}
        onClose={handleClose}
        autoCloseMs={5000}
      />
      {loading ? null : null}
    </>
  );
}
