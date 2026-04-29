export type CategoryDTO = "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";

export type DayDTO =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type BusinessHourDTO = {
  day: DayDTO;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

export type StoreDetailDataDTO = {
  storeId: number | string;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  category: CategoryDTO;
  rating: number;
  reviewCount: number | null;
  mainImageUrl?: string | null;
  tableImageUrls: string[] | null;
  businessHours: BusinessHourDTO[] | null;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
  isOpenNow?: boolean;

  depositAmount: number;
  depositRate?: number | null;
};
