export interface Slot {
  time: string;
  status: "AVAILABLE" | "BOOKED" | "BLOCKED";
  isAvailable: boolean;
  bookingId: number | null;
}

export interface GetSlotsResult {
  slots: Slot[];
}

export type SlotStatus = "AVAILABLE" | "BLOCKED";

export interface UpdateSlotRequest {
  targetDate: string;
  startTime: string;
  status: SlotStatus;
}

export interface UpdateSlotResult {
  targetDate: string;
  startTime: string;
  status: SlotStatus;
}

export interface PatchBreakTimeRequest {
  breakStartTime: string;
  breakEndTime: string;
}

export interface BookingDetailResult {
  bookerName: string;
  partySize: number;
  amount: number;
}

export type GetAvailableTimesParams = {
  storeId: string | number;
  date: string;
  partySize: number;
  isSplitAccepted: boolean;
};

export type AvailableTimesResult = {
  availableTimes: string[];
};

export type SeatsTypes = "WINDOW" | "GENERAL" | string;

export type AvailableTable = {
  tableId: number;
  tableNumber: string;
  tableSeats: number;
  seatsType: SeatsTypes;
  gridX: number;
  gridY: number;
  widthSpan: number;
  heightSpan: number;
};
export type GetAvailableTablesParams = {
  storeId: string | number;
  date: string;
  time: string;
  partySize: number;
  isSplitAccepted: boolean;
  seatsType?: string;
};

export type AvailableTablesResult = {
  rows: number;
  cols: number;
  tables: AvailableTable[];
};

export type CreateBookingBody = {
  date: string;
  time: string;
  partySize: number;
  tableIds: number[];
  menuItems: { menuId: number; quantity: number }[];
  isSplitAccepted: boolean;
};

export type CreateBookingResult = {
  bookingId: number;
  status: "PENDING" | "CONFIRMED" | string;
  storeName: string;
  date: string;
  time: string;
  partySize: number;
  totalDeposit: number;
  paymentId?: number;
  orderId: string;
};
