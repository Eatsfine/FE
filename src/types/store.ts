export type Category = "KOREAN" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Location {
  lat: number;
  lng: number;
}

export interface RestaurantSummary {
  id: number;
  name: string;
  address: string;
  category: Category;
  rating: number;
  reviewCount: number;
  distanceKm?: number;
  thumbnailUrl?: string;
  isOpenNow?: boolean;
  location?: Location;
}

export interface BusinessHour {
  day: Day;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

export interface BreakTime {
  start: string;
  end: string;
}

export interface RestaurantDetail {
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
  depositRate?: number;
}

export const storeCategoryLabel: Record<Category, string> = {
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  CAFE: "카페",
};

export type DepositRate = "TEN" | "TWENTY" | "THIRTY" | "FORTY" | "FIFTY";

export interface BusinessNumberDto {
  name: string;
  businessNumber: string;
  startDate: string;
}

export interface RequestStoreCreateDto {
  storeName: string;
  businessNumberDto?: BusinessNumberDto;
  description?: string;
  sido: string;
  sigungu: string;
  bname: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  category: Category;
  depositRate: DepositRate;
  bookingIntervalMinutes: number;
  businessHours: BusinessHour[];
}

export interface ResponseStoreCreateDto {
  storeId: number;
}

export interface RequestMainImageDto {
  mainImage: File;
}

export interface ResponseMainImageDto {
  storeId: number;
  mainImageUrl: string;
}

export interface UpdateStoreResponse {
  storeId: number;
  storeName: string;
  description: string;
  phoneNumber: string;
}

export interface AddressSearchResult {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  sido: string;
  sigungu: string;
}

export interface StoreDetail {
  storeId: number;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  businessHours?: BusinessHour[];
  isApproved: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface MyStore {
  storeId: number;
  storeName: string;
  address: string;
  category: string;
  rating: number;
  totalBookingCount: number;
  reviewCount: number;
  mainImageUrl: string;
  isOpenNow: boolean;
}

export interface MyStoreResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    stores: MyStore[];
  };
}

export interface TableImage {
  tableImageId: number;
  tableImageUrl: string;
}

export interface TableImagesResponse {
  storeId: number;
  tableImages: TableImage[];
}

export interface StoreDetailDataDTO {
  storeId: number | string;
  storeName: string;
  description: string;
  address: string;
  phone: string;
  category: Category;
  rating: number;
  reviewCount: number | null;
  mainImageUrl?: string | null;
  tableImageUrls: string[] | null;
  businessHours: BusinessHour[] | null;
  breakStartTime?: string | null;
  breakEndTime?: string | null;
  isOpenNow?: boolean;

  depositAmount: number;
  depositRate?: number | null;
}

export interface SearchStoreParams {
  keyword: string;
  lat: number;
  lng: number;
  radius?: number;
  category?: Category;
  sort?: "DISTANCE" | "RATING";
  page?: number;
  limit?: number;
  sido?: string;
  sigungu?: string;
  bname?: string;
}

export interface ApiStoreSummary {
  storeId: number;
  name: string;
  address: string;
  category: Category;
  rating: number | null;
  reviewCount: number | null;
  distance?: number | null;
  mainImageUrl?: string | null;
  isOpenNow?: boolean | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  lat?: number | string | null;
  lng?: number | string | null;
}

export interface SearchStoresResult {
  stores: ApiStoreSummary[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
  };
}
