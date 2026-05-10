import type { RestaurantSummary } from "./store";

export interface LatLng {
  lat: number;
  lng: number;
}
export interface MarkerWithLocation extends RestaurantSummary {
  location: LatLng;
}

type KakaoMaps = NonNullable<NonNullable<Window["kakao"]>["maps"]>;
export type KaKaoMapInstance = InstanceType<KakaoMaps["Map"]>;
export type KakaoMarkerInstance = InstanceType<KakaoMaps["Marker"]>;
export type KakaoInfoWindowInstance = InstanceType<KakaoMaps["InfoWindow"]>;
