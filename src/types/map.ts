import type { RestaurantSummary } from "./store";

export type LatLng = { lat: number; lng: number };
export type MarkerWithLocation = RestaurantSummary & { location: LatLng };

type KakaoMaps = NonNullable<NonNullable<Window["kakao"]>["maps"]>;
export type KaKaoMapInstance = InstanceType<KakaoMaps["Map"]>;
export type KakaoMarkerInstance = InstanceType<KakaoMaps["Marker"]>;
export type KakaoInfoWindowInstance = InstanceType<KakaoMaps["InfoWindow"]>;
