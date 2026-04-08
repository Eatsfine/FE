import type { SelectedMenu } from "@/types/menus";

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
  time?: string;
  seatType: SeatType;
  tablePref: TablePref;
  tableId: number;
  tableNo: number | null;
  selectedMenus: SelectedMenu[];
};

export type SeatTable = {
  id: number;
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
