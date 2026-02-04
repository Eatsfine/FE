import type { RestaurantSummary } from "@/types/store";
import { MOCK_STORE_SEARCH } from "@/mock/stores.search.mock";

export type StoreSearchParams = {
  lat: number;
  lng: number;
  keyword?: string;
  radiusKm?: number;
  sort?: "distance" | "rating";

  // API 붙이면 여기 확장하기
  // TODO: params.lat/lng 기반 거리 필터/정렬 추가 예정
  // category?: Category;
  // page?: number;
  // limit?: number;
  // sido?: string;
  // sigungu?: string;
  // bname?: string;
};

export async function searchMockStores(
  params: StoreSearchParams,
): Promise<RestaurantSummary[]> {
  await new Promise((r) => setTimeout(r, 500));

  const q = (params.keyword ?? "").trim().toLowerCase();

  if (!q) return [];

  const center = { lat: params.lat, lng: params.lng };
  const radiusKm = params.radiusKm ?? 5;
  const sort = params.sort ?? "distance";

  const matched = MOCK_STORE_SEARCH.filter((r) => {
    const name = r.name.toLowerCase();
    const category = r.category.toLowerCase();
    const address = r.address.toLowerCase();
    return name.includes(q) || category.includes(q) || address.includes(q);
  });
  const withDistance = matched
    .map((r) => {
      const distanceKm = haversineKm(center, r.location);
      return { r, distanceKm };
    })
    .filter(({ distanceKm }) => distanceKm <= radiusKm);

  withDistance.sort((a, b) => {
    if (sort === "rating") return b.r.rating - a.r.rating;
    return a.distanceKm - b.distanceKm;
  });

  return withDistance.map(({ r }) => r);
}

export function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const x =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}
