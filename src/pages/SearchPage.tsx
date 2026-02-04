import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import RestaurantList from "@/components/restaurant/RestaurantList";
import { type ReservationDraft, type Restaurant } from "@/types/restaurant";
import RestaurantDetailModal from "@/components/restaurant/RestaurantDetailModal";
import { MOCK_RESTAURANTS } from "@/mock/restaurants";
import ReservationModal from "@/components/reservation/ReservationModal";
import ReservationConfirmMoodal from "@/components/reservation/ReservationConfirmModal";
import ReservationCompleteModal from "@/components/reservation/ReservationCompleteModal";
import PaymentModal from "@/components/reservation/PaymentModal";
import ReservationMenuModal from "@/components/reservation/ReservationMenuModal";
import { MOCK_STORE_DETAIL_BY_ID } from "@/mock/stores.detail.mock";
import type { RestaurantDetail, RestaurantSummary } from "@/types/store";
import { searchMockStores } from "@/mock/store.api.mock";
import KakaoMap from "@/components/map/KakaoMap";

type DetailStatus = "idle" | "loading" | "success" | "error";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveMenuOpen, setReserveMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draft, setDraft] = useState<ReservationDraft | null>(null);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [detailStatus, setDetailStatus] = useState<DetailStatus>("idle");
  const [detailData, setDetailData] = useState<RestaurantDetail | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<RestaurantSummary[]>([]);

  const [hasSearched, setHasSearched] = useState(false);

  const FALLBACK_COORDS = { lat: 37.5665, lng: 126.978 };

  const [mapCenter, setMapCenter] = useState(FALLBACK_COORDS);

  const selectedLegacy: Restaurant | null = useMemo(() => {
    if (!selectedStoreId) return null;
    return MOCK_RESTAURANTS.find((r) => r.id === selectedStoreId) ?? null;
  }, [selectedStoreId]);

  async function fetchStoreDetailMock(storeId: string) {
    const detail = MOCK_STORE_DETAIL_BY_ID[storeId];
    if (!detail) throw new Error("상세 정보 mock데이터가 없습니다");
    return detail;
  }

  const openDetail = async (restaurant: RestaurantSummary) => {
    const storeId = restaurant.id;

    setSelectedStoreId(storeId);
    setDetailOpen(true);
    setDetailStatus("loading");
    setDetailData(null);
    setDetailError(null);
    setDraft(null);
    setConfirmOpen(false);
    setReserveOpen(false);
    try {
      const detail = await fetchStoreDetailMock(storeId);
      setDetailData(detail);
      setDetailStatus("success");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "상세 정보를 불러오지 못했어요";
      setDetailError(msg);
      setDetailStatus("error");
    }
  };

  const retryDetail = async () => {
    if (!selectedStoreId) return;
    setDetailStatus("loading");
    setDetailError(null);
    try {
      const detail = await fetchStoreDetailMock(selectedStoreId);
      setDetailData(detail);
      setDetailStatus("success");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "상세 정보를 불러오지 못했어요";
      setDetailError(msg);
      setDetailStatus("error");
    }
  };

  const handleSelectStore = (store: RestaurantSummary) => {
    openDetail(store);
  };

  const goReserve = () => {
    setDraft(null);
    setDetailOpen(false);
    setDetailStatus("idle");
    setDetailData(null);
    setDetailError(null);
    setReserveOpen(true);
  };

  const goReserveMenu = (d: ReservationDraft) => {
    setDraft(d);
    setReserveOpen(false);
    setReserveMenuOpen(true);
  };

  const backToReserve = () => {
    setReserveMenuOpen(false);
    setReserveOpen(true);
  };
  const goConfirm = (d: ReservationDraft) => {
    setDraft(d);
    setReserveMenuOpen(false);
    setConfirmOpen(true);
  };
  const backToReserveMenu = () => {
    setConfirmOpen(false);
    setReserveMenuOpen(true);
  };

  const goPayment = () => {
    setConfirmOpen(false);
    setPaymentOpen(true);
  };

  const closeModalsOnly = () => {
    setDetailOpen(false);
    setReserveOpen(false);
    setReserveMenuOpen(false);
    setConfirmOpen(false);
    setPaymentOpen(false);
    setCompleteOpen(false);
  };

  const resetAll = () => {
    closeModalsOnly();
    setDraft(null);
    setSelectedStoreId(null);
    setDetailStatus("idle");
    setDetailData(null);
    setDetailError(null);
    setResults([]);
    setSearchError(null);
    setHasSearched(false);
    setMapCenter(FALLBACK_COORDS);
    setCoords(null);
    setQuery("");
  };

  function getCoords(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(FALLBACK_COORDS);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => resolve(FALLBACK_COORDS),
        { enableHighAccuracy: false, timeout: 5000 },
      );
    });
  }

  const runSearch = async () => {
    setHasSearched(true);

    setSelectedStoreId(null);
    const keyword = query.trim();
    setSearchError(null);

    if (!keyword) {
      setResults([]);
      return;
    }

    const c = coords ?? (await getCoords());
    setCoords(c);

    setMapCenter({ lat: c.lat, lng: c.lng });

    try {
      const items = await searchMockStores({
        lat: c.lat,
        lng: c.lng,
        keyword,
        radiusKm: 50,
        sort: "distance",
      });
      setResults(items);

      if (items.length === 1) {
        setSelectedStoreId(items[0].id);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "검색에 실패했어요";
      setSearchError(msg);
      setResults([]);
    }
  };

  return (
    <>
      {/* 검색창 */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="식당 이름, 지역, 음식 종류로 검색해보세요"
            className="w-full px-5 py-4 pr-14 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            aria-label="검색"
            onClick={runSearch}
          >
            <Search className="size-5" />
          </button>
        </div>
      </div>

      {/* 카카오맵 */}
      <KakaoMap
        center={mapCenter}
        markers={results}
        selectedId={selectedStoreId}
        onSelectMarker={handleSelectStore}
        defaultLevel={4}
        selectedLevel={3}
      />

      <div className="mt-6 w-full max-w-2xl mx-auto">
        {searchError ? (
          <p className="mt-2 text-sm text-red-500">{searchError}</p>
        ) : null}
        {hasSearched ? (
          <RestaurantList restaurants={results} onSelect={handleSelectStore} />
        ) : null}
      </div>
      {/* 상세 페이지 모달 */}
      {detailOpen && (
        <RestaurantDetailModal
          open={detailOpen}
          onOpenChange={(o: boolean) => {
            setDetailOpen(o);
            if (!o) {
              closeModalsOnly();
            }
          }}
          status={detailStatus}
          restaurant={detailData}
          errorMessage={detailError ?? undefined}
          onRetry={retryDetail}
          onClickReserve={goReserve}
        />
      )}
      {/* 예약 페이지 모달 */}
      {selectedLegacy && (
        <ReservationModal
          open={reserveOpen}
          onOpenChange={(o: boolean) => {
            setReserveOpen(o);
            if (!o) closeModalsOnly();
          }}
          restaurant={selectedLegacy}
          initialDraft={draft ?? undefined}
          onClickConfirm={goReserveMenu}
          onClose={closeModalsOnly}
        />
      )}
      {/* 메뉴선택 모달 */}
      {selectedLegacy && draft && (
        <ReservationMenuModal
          open={reserveMenuOpen}
          onOpenChange={(o: boolean) => {
            setReserveMenuOpen(o);
            if (!o) closeModalsOnly();
          }}
          restaurant={selectedLegacy}
          onConfirm={goConfirm}
          onBack={backToReserve}
          onClose={closeModalsOnly}
          draft={draft}
        />
      )}
      {/* 예약확인 페이지 모달 */}
      {selectedLegacy && draft && (
        <ReservationConfirmMoodal
          open={confirmOpen}
          onClose={closeModalsOnly}
          onBack={backToReserveMenu}
          onConfirm={goPayment}
          restaurant={selectedLegacy}
          draft={draft}
        />
      )}

      {/* 결제 모달 */}
      {selectedLegacy && draft && paymentOpen && (
        <PaymentModal
          open={paymentOpen}
          onClose={closeModalsOnly}
          onOpenChange={setPaymentOpen}
          restaurant={selectedLegacy}
          draft={draft}
          onSuccess={() => {
            setPaymentOpen(false);
            setCompleteOpen(true); //결제 성공 완료모달
          }}
        />
      )}
      {/* 예약완료 페이지 모달 */}
      {selectedLegacy && draft && (
        <ReservationCompleteModal
          open={completeOpen}
          restaurant={selectedLegacy}
          draft={draft}
          onClose={closeModalsOnly}
          autoCloseMs={5000}
        />
      )}
    </>
  );
}
