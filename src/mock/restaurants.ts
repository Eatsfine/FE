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
        url: "/seatImg1.jpg",
        alt: "좌석 3",
      },
      {
        url: "/seatImg2.jpg",
        alt: "좌석 4",
      },
    ],
    markerPosition: { leftPct: 30, topPct: 40 },
    paymentPolicy: {
      depositRate: 0.2, // 20%로 가정
      depositAmount: 10000, //고정예약금 만원(임시)
      notice:
        "예약 확정을 위해 예약금 결제가 필요합니다. 노쇼 방지를 위한 정책입니다.",
    },
  },
  {
    id: "2",
    name: "이탈리아 트라토리아",
    category: "이탈리아",
    thumbnailUrl: "/ItalyTrattoria.jpg",
    rating: 4.5,
    reviewCount: 215,
    operatingHours: {
      open: "12:00",
      close: "23:00 (연중무휴)",
    },
    totalSeats: 36,
    address: "서울특별시 종로구 인사동길 45",
    description:
      "정통 이탈리아 가정식을 선보이는 아늑한 레스토랑입니다. 직접 만든 파스타와 피자를 즐기실 수 있습니다.",
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
        url: "/seatImg1.jpg",
        alt: "좌석 1",
      },
      {
        url: "/seatImg2.jpg",
        alt: "좌석 2",
      },
    ],
    markerPosition: { leftPct: 50, topPct: 20 },
    paymentPolicy: {
      depositRate: 0.4, //40%로 가정
      depositAmount: 20000, //고정예약금 2만원(임시)
      notice:
        "예약 확정을 위해 예약금 결제가 필요합니다. 노쇼 방지를 위한 정책입니다.",
    },
  },
  {
    id: "3",
    name: "스카이뷰 레스토랑",
    category: "다이닝",
    thumbnailUrl: "/seatImg1.jpg",
    rating: 4.8,
    reviewCount: 452,
    operatingHours: {
      open: "10:00",
      close: "00:00 (라스트오더 23:00)",
    },
    totalSeats: 62,
    address: "서울특별시 마포구 월드컵북로 56",
    description:
      "한강 뷰를 감상하며 식사할 수 있는 프리미엄 다이닝 레스토랑입니다. 로맨틱한 분위기와 훌륭한 전망을 자랑합니다.",
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
        url: "/seatImg1.jpg",
        alt: "좌석 1",
      },
      {
        url: "/seatImg2.jpg",
        alt: "좌석 2",
      },
    ],
    markerPosition: { leftPct: 90, topPct: 90 },
    paymentPolicy: {
      depositRate: 0.5, // 50%로 가정
      depositAmount: 25000, //고정예약금 2만오천원(임시)
      notice:
        "예약 확정을 위해 예약금 결제가 필요합니다. 노쇼 방지를 위한 정책입니다.",
    },
  },
];
