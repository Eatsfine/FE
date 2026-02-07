// import type { $ZodNumberDef } from "zod/v4/core";

export type Category = "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type Location = {
  lat: number;
  lng: number;
};

export type RestaurantSummary = {
  id: number;
  name: string;
  address: string;
  category: Category;
  rating: number;
  reviewCount: number;
  distanceKm?: number;
  thumbnailUrl?: string;
  isOpenNow?: boolean;
  location: Location;
};

export type BusinessHour = {
  day: Day;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
};

export type BreakTime = {
  start: string;
  end: string;
};

export type RestaurantDetail = {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  category: Category;
  rating: number;
  reviewCount: number;
  depositAmount: number;
  mainImageUrl?: string;
  tableImageUrls: string[];
  businessHours: BusinessHour[];
  breakTime?: BreakTime;
  isOpenNow?: boolean;
  location?: Location;
};

export const categoryLabel: Record<Category, string> = {
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  CAFE: "카페",
};
