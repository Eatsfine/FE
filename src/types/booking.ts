export type ApiBookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";

export interface Pagination {
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface BookingResponse extends Pagination {
  bookingList: BookingListItem[];
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
  amount: number | null;
  paymentMethod: string;
  status: ApiBookingStatus;
}

export interface UserBookingsResult extends Pagination {
  bookingList: BookingListItem[];
}

export type UserBookingItem = BookingListItem;
