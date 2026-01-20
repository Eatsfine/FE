// API붙이기전에 날짜.시간 바뀌면 예약불가 보이도록 만드는 UX 확인용 mock데이터임.

export function getMockAvailableTableIds(params: {
  restaurantId: string;
  dateYmd: string;
  time: string;
  tableIds: string[];
}): Set<string> {
  const { restaurantId, dateYmd, time, tableIds } = params;

  const seedStr = `${restaurantId}|${dateYmd}|${time}`;

  // 간단한 문자열 해시
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++)
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;

  const available = new Set<string>();

  // 테이블마다 seed기반으로 70%정도만 available 처리
  for (const id of tableIds) {
    let h = seed;
    for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) >>> 0;
    const r = (h % 100) / 100; //0~0.99
    if (r < 0.7) available.add(id);
  }

  return available;
}
