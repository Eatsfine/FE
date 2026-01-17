// n*m 격자 그리드. 어떤 테이블 몇번째 칸에 있는지 배치도 데이터 제공

import type { SeatLayout } from "@/types/restaurant";

export const MOCK_SEAT_LAYOUT_BY_RESTAURANT: Record<string, SeatLayout> = {
  "r-1": {
    gridCols: 8,
    gridRows: 6,
    tables: [
      // 일반석
      {
        id: "t-101",
        tableNo: 1,
        minPeople: 2,
        maxPeople: 4,
        seatType: "일반석",
        gridX: 1,
        gridY: 1,
      },
      {
        id: "t-102",
        tableNo: 2,
        minPeople: 2,
        maxPeople: 4,
        seatType: "일반석",
        gridX: 2,
        gridY: 1,
      },
      {
        id: "t-103",
        tableNo: 3,
        minPeople: 4,
        maxPeople: 6,
        seatType: "일반석",
        gridX: 3,
        gridY: 1,
      },
      {
        id: "t-104",
        tableNo: 4,
        minPeople: 1,
        maxPeople: 2,
        seatType: "일반석",
        gridX: 1,
        gridY: 2,
      },
      {
        id: "t-105",
        tableNo: 5,
        minPeople: 2,
        maxPeople: 4,
        seatType: "일반석",
        gridX: 2,
        gridY: 2,
      },

      // 룸
      {
        id: "t-201",
        tableNo: 10,
        minPeople: 4,
        maxPeople: 8,
        seatType: "룸/프라이빗",
        gridX: 6,
        gridY: 1,
      },
      {
        id: "t-202",
        tableNo: 11,
        minPeople: 2,
        maxPeople: 6,
        seatType: "룸/프라이빗",
        gridX: 6,
        gridY: 2,
      },

      // 창가석 (SEATS에 있다고 가정)
      {
        id: "t-301",
        tableNo: 20,
        minPeople: 2,
        maxPeople: 2,
        seatType: "창가석",
        gridX: 0,
        gridY: 4,
      },
      {
        id: "t-302",
        tableNo: 21,
        minPeople: 2,
        maxPeople: 4,
        seatType: "창가석",
        gridX: 0,
        gridY: 5,
      },
    ],
  },
};

export function getMockLayoutByRestaurantId(
  restaurantId: string
): SeatLayout | null {
  return MOCK_SEAT_LAYOUT_BY_RESTAURANT[restaurantId] ?? null;
}
