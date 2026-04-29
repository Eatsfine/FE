import { useMutation } from "@tanstack/react-query";

import { createBooking } from "@/api/endpoints/reservations";

export function useCreateBooking() {
  return useMutation({
    mutationFn: createBooking,
  });
}
