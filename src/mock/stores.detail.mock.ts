import type { RestaurantDetail } from "@/types/store";

export const MOCK_STORE_DETAIL_BY_ID: Record<string, RestaurantDetail> = {
  "1": {
    id: 1,
    name: "모던 한식당",
    category: "KOREAN",
    rating: 4.7,
    reviewCount: 328,
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1111-1111",
    description:
      "전통 한식을 모던하게 재해석한 프리미엄 한식 레스토랑입니다. 신선한 재료로 정성껏 준비한 요리를 맛보실 수 있습니다",
    depositAmount: 3000,
    mainImageUrl: "/modernKoreaRestaurant.jpg",
    tableImageUrls: ["/seatImg1.jpg", "/seatImg2.jpg"],
    businessHours: [
      { day: "MONDAY", openTime: "11:00", closeTime: "22:00", isClosed: false },
      {
        day: "TUESDAY",
        openTime: "11:00",
        closeTime: "22:00",
        isClosed: false,
      },
      {
        day: "WEDNESDAY",
        openTime: "11:00",
        closeTime: "22:00",
        isClosed: false,
      },
      {
        day: "THURSDAY",
        openTime: "11:00",
        closeTime: "22:00",
        isClosed: false,
      },
      { day: "FRIDAY", openTime: "11:00", closeTime: "22:00", isClosed: false },
      {
        day: "SATURDAY",
        openTime: "11:00",
        closeTime: "22:00",
        isClosed: false,
      },
      { day: "SUNDAY", openTime: "11:00", closeTime: "22:00", isClosed: false },
    ],
    breakTime: { start: "15:00", end: "17:00" },
    isOpenNow: true,
    location: { lat: 37.498, lng: 127.0276 },
  },
  "2": {
    id: 2,
    name: "이탈리아 트라토리아",
    category: "WESTERN",
    rating: 4.5,
    reviewCount: 215,
    address: "서울특별시 종로구 인사동길 45",
    phone: "02-2222-2222",
    description:
      "전통 이탈리아 가정식을 선보이는 아늑한 레스토랑입니다. 직접 만든 파스타와 피자를 즐기실 수 있습니다.",
    depositAmount: 5000,
    mainImageUrl: "/ItalyTrattoria.jpg",
    tableImageUrls: ["/seatImg1.jpg", "/seatImg2.jpg"],
    businessHours: [
      { day: "MONDAY", openTime: "12:00", closeTime: "22:00", isClosed: false },
      {
        day: "TUESDAY",
        openTime: "12:00",
        closeTime: "22:00",
        isClosed: false,
      },
      {
        day: "WEDNESDAY",
        openTime: "12:00",
        closeTime: "22:00",
        isClosed: false,
      },
      {
        day: "THURSDAY",
        openTime: "12:00",
        closeTime: "22:00",
        isClosed: false,
      },
      { day: "FRIDAY", openTime: "12:00", closeTime: "22:00", isClosed: false },
      {
        day: "SATURDAY",
        openTime: "12:00",
        closeTime: "22:00",
        isClosed: false,
      },
      { day: "SUNDAY", openTime: "12:00", closeTime: "22:00", isClosed: false },
    ],
    isOpenNow: false,
    location: { lat: 37.574, lng: 126.984 },
  },
  "3": {
    id: 3,
    name: "스카이뷰 레스토랑",
    category: "WESTERN",
    rating: 4.8,
    reviewCount: 452,
    address: "서울특별시 마포구 월드컵북로 56",
    phone: "02-3333-3333",
    description:
      "한강 뷰를 감상하며 식사할 수 있는 프리미엄 다이닝 레스토랑입니다. 로맨틱한 분위기와 훌륭한 전망을 자랑합니다.",
    depositAmount: 7000,
    mainImageUrl: "/seatImg1.jpg",
    tableImageUrls: ["/seatImg1.jpg", "/seatImg2.jpg"],
    businessHours: [
      { day: "MONDAY", openTime: "10:00", closeTime: "20:00", isClosed: false },
      {
        day: "TUESDAY",
        openTime: "10:00",
        closeTime: "20:00",
        isClosed: false,
      },
      {
        day: "WEDNESDAY",
        openTime: "10:00",
        closeTime: "20:00",
        isClosed: false,
      },
      {
        day: "THURSDAY",
        openTime: "10:00",
        closeTime: "20:00",
        isClosed: false,
      },
      { day: "FRIDAY", openTime: "10:00", closeTime: "22:00", isClosed: false },
      {
        day: "SATURDAY",
        openTime: "10:00",
        closeTime: "22:00",
        isClosed: false,
      },
      { day: "SUNDAY", openTime: "10:00", closeTime: "20:00", isClosed: false },
    ],
    breakTime: { start: "14:00", end: "17:00" },
    isOpenNow: true,
    location: { lat: 37.5695, lng: 126.8997 },
  },
};

export function getMockStoreDetail(
  storeId: string,
): RestaurantDetail | undefined {
  return MOCK_STORE_DETAIL_BY_ID[storeId];
}
