import { loadKakaoMapSdk } from "@/lib/kakao";
import type { RestaurantSummary } from "@/types/store";
import { useEffect, useMemo, useRef } from "react";

type LatLng = { lat: number; lng: number };

type Props = {
  center: LatLng;
  markers: RestaurantSummary[];
  selectedId?: string | null;
  onSelectMarker?: (store: RestaurantSummary) => void;
  className?: string;
};
declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({
  center,
  markers,
  selectedId,
  onSelectMarker,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoRef = useRef<any>(null);

  const safeMarkers = useMemo(
    () => markers.filter((m) => !!m.location),
    [markers],
  );

  //1. 지도 최초 1회 생성
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        await loadKakaoMapSdk();
        if (cancelled) return;
        if (!containerRef.current) return;

        const kakao = window.kakao;
        if (mapRef.current) return;

        const options = {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: 4,
        };
        mapRef.current = new kakao.maps.Map(containerRef.current, options);
        infoRef.current = new kakao.maps.InfoWindow({ zIndex: 2 });
      } catch (e) {
        console.error(e);
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  //2. 센터바뀌면 지도 중심 이동
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    if (!mapRef.current) return;

    const next = new kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(next);
  }, [center.lat, center.lng]);

  //3. 마커 바뀌면 마커 재생성
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    if (!mapRef.current) return;

    markersRef.current.forEach((mk) => mk.setMap(null));
    markersRef.current = [];

    safeMarkers.forEach((store) => {
      const loc = store.location;
      const pos = new kakao.maps.LatLng(loc.lat, loc.lng);

      const isSelected = selectedId && store.id === selectedId;

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: pos,
        clickable: true,
        zIndex: isSelected ? 10 : 1,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        if (infoRef.current) {
          infoRef.current.setContent(
            `<div style="padding:6px 8px;font-size:12px;line-height:1.2;">${store.name}</div>`,
          );
          infoRef.current.open(mapRef.current, marker);
        }
        onSelectMarker?.(store);
      });
      markersRef.current.push(marker);
    });
  }, [safeMarkers, selectedId, onSelectMarker]);

  return (
    <div
      ref={containerRef}
      className={
        className ??
        "relative w-full h-125 bg-gray-100 rounded-xl overflow-hidden"
      }
    >
      {!window.kakao?.maps ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          카카오맵 로딩 중..
        </div>
      ) : null}
    </div>
  );
}
