import type { Restaurant } from "@/types/restaurant";

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "모던 한식당",
    category: "한식",
    thumbnailUrl: "/modernKoreaRestaurant.jpg",
    rating: 4.7,
    reviewCount: 328,
    operatingHours: {
      open: "11:00",
      close: "22:00",
      breakTime: { start: "15:00", end: "17:00" },
    },
    totalSeats: 48,
    address: "서울특별시 강남구 테헤란로 123",
    description:
      "전통 한식을 모던하게 재해석한 프리미엄 한식 레스토랑입니다. 신선한 제철 재료로 정성껏 준비한 요리를 맛보실 수 있습니다.",
    seatImages: [
      {
        url: "/seatImg1.jpg",
        alt: "좌석 1",
      },
      {
        url: "/seatImg2.jpg",
        alt: "좌석 2",
      },
      {
        url: "/seatImg3.jpg",
        alt: "좌석 3",
      },
      {
        url: "/seatImg4.jpg",
        alt: "좌석 4",
      },
    ],
    markerPosition: { leftPct: 30, topPct: 40 },
  },
];
