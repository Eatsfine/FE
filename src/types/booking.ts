export type ApiBookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";

export interface Booking {
  bookingId: number;
  storeName: string;
  storeAddress: string;
  bookingDate: string;
  bookingTime: string;
  partySize: number;
  tableNumbers: string;
  amount: number | null;
  paymentMethod: string;
  status: ApiBookingStatus;
}

export interface BookingResponse {
  bookingList: Booking[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface GetBookingParams {
  page: number;
  status?: ApiBookingStatus;
}

export interface BookingListItem {
  bookingId: number;
  storeName: string;
  storeAddress: string;
  bookingDate: string;
  bookingTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  partySize: number;
  tableNumbers: string;
  amount: number;
  paymentMethod: string;
  status: ApiBookingStatus;
}

export interface UserBookingsResult {
  bookingList: BookingListItem[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export type UserBookingItem = BookingListItem;
