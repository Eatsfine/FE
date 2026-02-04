import { loadKakaoMapSdk } from "@/lib/kakao";
import type { RestaurantSummary } from "@/types/store";
import { useEffect, useMemo, useRef, useState } from "react";

type LatLng = { lat: number; lng: number };

type Props = {
  center: LatLng;
  markers: RestaurantSummary[];
  selectedId?: string | null;
  onSelectMarker?: (store: RestaurantSummary) => void;
  className?: string;
  defaultLevel?: number;
  selectedLevel?: number;
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
  defaultLevel,
  selectedLevel,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const infoRef = useRef<any>(null);
  const prevSelectedIdRef = useRef<string | null>(null);

  const safeMarkers = useMemo(
    () => markers.filter((m) => !!m.location),
    [markers],
  );

  const [sdkReady, setSdkReady] = useState(!!window.kakao?.map);

  //1. 지도 최초 1회 생성
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        await loadKakaoMapSdk();
        if (cancelled) return;
        setSdkReady(true);
        if (!containerRef.current) return;

        const kakao = window.kakao;
        if (mapRef.current) return;

        const options = {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: defaultLevel ?? 4,
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
  }, [center.lat, center.lng, defaultLevel]);

  //2. 센터바뀌면 지도 중심 이동
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps || !mapRef.current) return;

    if (selectedId) return;

    const next = new kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current.panTo(next);
  }, [center.lat, center.lng, selectedId]);

  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps || !mapRef.current) return;

    if (!selectedId) return;
    const target = safeMarkers.find((m) => m.id === selectedId);
    if (!target) return;

    const next = new kakao.maps.LatLng(
      target.location.lat,
      target.location.lng,
    );

    mapRef.current.panTo(next);
    if (selectedLevel) mapRef.current.setLevel(selectedLevel);
  }, [selectedId, selectedLevel, safeMarkers]);

  //3. 마커 바뀌면 마커 재생성
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps || !mapRef.current) return;

    markersRef.current.forEach((mk) => mk.setMap(null));
    markersRef.current.clear();

    safeMarkers.forEach((store) => {
      const pos = new kakao.maps.LatLng(store.location.lat, store.location.lng);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: pos,
        clickable: true,
        zIndex: 1,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        if (infoRef.current) {
          const el = document.createElement("div");
          el.style.cssText =
            "padding: 6px 8px; font-size:12px;line-height:1.2;";
          el.textContent = store.name;
          infoRef.current.setContent(el);
          infoRef.current.open(mapRef.current, marker);
        }
        onSelectMarker?.(store);
      });
      markersRef.current.set(store.id, marker);
    });
  }, [safeMarkers, onSelectMarker]);

  // 선택변경 useeffect. selectedId가 바뀔때만
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps || !mapRef.current) return;

    const prevId = prevSelectedIdRef.current;
    if (prevId) {
      const prevMarker = markersRef.current.get(prevId);
      prevMarker?.setZIndex(1);
    }
    if (selectedId) {
      const nextMarker = markersRef.current.get(selectedId);
      nextMarker?.setZIndex(10);
      const target = safeMarkers.find((m) => m.id === selectedId);
      if (target) {
        const next = new kakao.maps.LatLng(
          target.location.lat,
          target.location.lng,
        );
        mapRef.current.panTo(next);
        if (selectedLevel) mapRef.current.setLevel(selectedLevel);
      }
    }
    prevSelectedIdRef.current = selectedId ?? null;
  }, [selectedId, selectedLevel, safeMarkers]);

  //4. 마커 목록 바뀌면 bounds 맞추기
  useEffect(() => {
    const kakao = window.kakao;
    if (!kakao?.maps || !mapRef.current) return;
    if (selectedId) return;
    if (safeMarkers.length === 0) return;
    const bounds = new kakao.maps.LatLngBounds();

    safeMarkers.forEach((store) => {
      bounds.extend(
        new kakao.maps.LatLng(store.location.lat, store.location.lng),
      );
    });
    mapRef.current.setBounds(bounds);
    if (safeMarkers.length === 1) {
      mapRef.current.setLevel(defaultLevel ?? 4);
    }
  }, [safeMarkers, selectedId, defaultLevel]);

  return (
    <div
      ref={containerRef}
      className={
        className ??
        "relative w-full h-125 bg-gray-100 rounded-xl overflow-hidden"
      }
    >
      {!setSdkReady ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          카카오맵 로딩 중..
        </div>
      ) : null}
    </div>
  );
}
