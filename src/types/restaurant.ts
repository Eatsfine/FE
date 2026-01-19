export type Restaurant = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  operatingHours: {
    open: string;
    close: string;
    breakTime?: {
      start: string;
      end: string;
    };
    //만약 요일별로 다르다고 한다면 확장될 가능성있음 weekday, weekend 등
  };
  totalSeats: number;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  description: string;
  seatImages: Array<{
    url: string;
    alt: string;
  }>;
  markerPosition: {
    leftPct: number;
    topPct: number;
  };
  thumbnailUrl?: string;
  paymentPolicy?: PaymentPolicy;
};

export const SEATS = [
  "일반석",
  "창가석",
  "룸/프라이빗",
  "바(Bar)석",
  "야외석",
] as const;
export type SeatType = (typeof SEATS)[number];
export type TablePref = "split_ok" | "one_table";

export type ReservationDraft = {
  people: number;
  date: Date;
  time: string;
  seatType: SeatType;
  tablePref: TablePref;
  payment: PaymentPolicy;
  tableId: string;
};

export type PaymentPolicy = {
  depositRate: 0.1 | 0.2 | 0.3 | 0.4 | 0.5;
  depositAmount: number;
  notice?: string;
};

export type SeatTable = {
  id: string;
  tableNo: number;
  minPeople: number;
  maxPeople: number;
  seatType: SeatType;
  gridX: number;
  gridY: number;
  imageUrl?: string;
};

export type SeatLayout = {
  gridCols: number;
  gridRows: number;
  tables: SeatTable[];
};

export type Step = "form" | "confirm";
