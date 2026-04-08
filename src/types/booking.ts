import type { getUserBookings } from "@/api/endpoints/bookings";

export type UserBookingItem = Awaited<
  ReturnType<typeof getUserBookings>
>["bookingList"][number];
