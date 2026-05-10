import type { SeatsType } from "./table";

export interface LayoutTable {
  tableId: number;
  tableNumber: string;
  minSeatCount: number;
  maxSeatCount: number;
  gridX: number;
  gridY: number;
  widthSpan: number;
  heightSpan: number;
  tableImageUrl: string | null;
  seatsType: SeatsType;
}

export interface LayoutResponse {
  layoutId: number;
  totalTableCount: number;
  gridInfo: { gridCol: number; gridRow: number };
  tables: LayoutTable[];
}

export interface CreateTableRequest {
  gridX: number;
  gridY: number;
  minSeatCount: number;
  maxSeatCount: number;
  seatsType: SeatsType;
}

export interface CreateTableResponse {
  tableId: number;
  tableNumber: string;
  minSeatCount: number;
  maxSeatCount: number;
  seatsType: string;
  gridX: number;
  gridY: number;
  tableImageUrl: string | null;
}
