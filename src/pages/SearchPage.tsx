import { useRef, useState } from "react";
import { Search } from "lucide-react";
import RestaurantList from "@/components/restaurant/RestaurantList";
import type { ReservationDraft } from "@/types/restaurant";
import RestaurantDetailModal from "@/components/restaurant/RestaurantDetailModal";
import ReservationModal from "@/components/reservation/modals/ReservationModal";
import ReservationConfirmMoodal from "@/components/reservation/modals/ReservationConfirmModal";
import PaymentModal from "@/components/reservation/modals/PaymentModal";
import ReservationMenuModal from "@/components/reservation/modals/ReservationMenuModal";
import { MOCK_STORE_DETAIL_BY_ID } from "@/mock/stores.detail.mock";
import type { RestaurantDetail, RestaurantSummary } from "@/types/store";
import KakaoMap from "@/components/map/KakaoMap";
import { useRestaurantDetail } from "@/hooks/store/useRestaurantDetail";
import { useSearchStores } from "@/hooks/store/useSearchStores";
import type { CreateBookingResult } from "@/api/endpoints/reservations";

type DetailStatus = "idle" | "loading" | "success" | "error";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveMenuOpen, setReserveMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draft, setDraft] = useState<ReservationDraft | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [hasSearched, setHasSearched] = useState(false);
  const FALLBACK_COORDS = { lat: 37.5665, lng: 126.978 };
  const [mapCenter, setMapCenter] = useState(FALLBACK_COORDS);

  const detailQuery = useRestaurantDetail(selectedStoreId);

  const [searchParams, setSearchParams] = useState<{
    keyword: string;
    lat: number;
    lng: number;
  } | null>(null);
  const searchQuery = useSearchStores(
    searchParams
      ? { ...searchParams, radius: 50, sort: "DISTANCE", page: 1, limit: 20 }
      : null,
  );

  const results = searchQuery.data ?? [];

  // const [searchError, setSearchError] = useState<string | null>(null);
  const searchError = searchQuery.isError
    ? searchQuery.error instanceof Error
      ? searchQuery.error.message
      : "검색에 실패했어요"
    : null;

  const [detailStatus, setDetailStatus] = useState<DetailStatus>("idle");
  const [detailData, setDetailData] = useState<RestaurantDetail | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const detailRequestIdRef = useRef(0);

  async function fetchStoreDetailMock(storeId: number) {
    const detail = MOCK_STORE_DETAIL_BY_ID[String(storeId)];
    if (!detail) throw new Error("상세 정보 mock데이터가 없습니다");
    return detail;
  }
  const [booking, setBooking] = useState<{
    bookingId: number;
    orderId: string;
    totalDeposit: number;
  } | null>(null);

  const openDetail = async (restaurant: RestaurantSummary) => {
    const storeId = restaurant.id;
    setSelectedStoreId(storeId);
    setDetailOpen(true);
    setDraft(null);
    setConfirmOpen(false);
    setReserveOpen(false);
    setReserveMenuOpen(false);
    setPaymentOpen(false);
    setBooking(null);
  };

  const retryDetail = async () => {
    if (!selectedStoreId) return;
    const requestId = ++detailRequestIdRef.current;
    setDetailStatus("loading");
    setDetailError(null);
    try {
      const detail = await fetchStoreDetailMock(selectedStoreId);
      if (requestId !== detailRequestIdRef.current) return;
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

  const goPayment = (bookingResult: CreateBookingResult) => {
    setBooking({
      bookingId: bookingResult.bookingId,
      orderId: bookingResult.orderId,
      totalDeposit: bookingResult.totalDeposit,
    });
    setConfirmOpen(false);
    setPaymentOpen(true);
  };

  const backToConfirm = () => {
    setPaymentOpen(false);
    setConfirmOpen(true);
  };

  const closeModalsOnly = () => {
    setDetailOpen(false);
    setReserveOpen(false);
    setReserveMenuOpen(false);
    setConfirmOpen(false);
    setPaymentOpen(false);
  };

  // const resetAll = () => {
  //   closeModalsOnly();
  //   setDraft(null);
  //   setSelectedStoreId(null);
  //   setDetailStatus("idle");
  //   setDetailData(null);
  //   setDetailError(null);
  //   setResults([]);
  //   setSearchError(null);
  //   setHasSearched(false);
  //   setMapCenter(FALLBACK_COORDS);
  //   setCoords(null);
  //   setQuery("");
  // };

  function getCoords(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(FALLBACK_COORDS);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve(FALLBACK_COORDS),
        { enableHighAccuracy: false, timeout: 5000 },
      );
    });
  }

  const runSearch = async () => {
    setHasSearched(true);
    setSelectedStoreId(null);
    const keyword = query.trim();

    if (!keyword) {
      setSearchParams(null);
      return;
    }

    const c = coords ?? (await getCoords());
    setCoords(c);
    setMapCenter({ lat: c.lat, lng: c.lng });
    setSearchParams({ keyword, lat: c.lat, lng: c.lng });
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
          status={
            !selectedStoreId
              ? "idle"
              : detailQuery.isLoading
                ? "loading"
                : detailQuery.isError
                  ? "error"
                  : "success"
          }
          restaurant={detailQuery.data ?? null}
          errorMessage={
            detailQuery.isError
              ? detailQuery.error instanceof Error
                ? detailQuery.error.message
                : "상세 조회 실패"
              : undefined
          }
          onRetry={() => detailQuery.refetch()}
          onClickReserve={goReserve}
        />
      )}
      {/* 예약 페이지 모달 */}
      {reserveOpen && selectedStoreId && detailQuery.data && (
        <ReservationModal
          open={reserveOpen}
          onOpenChange={(o: boolean) => {
            setReserveOpen(o);
            if (!o) closeModalsOnly();
          }}
          restaurant={detailQuery.data ?? null}
          initialDraft={draft ?? undefined}
          onClickConfirm={goReserveMenu}
          onClose={closeModalsOnly}
        />
      )}
      {/* 메뉴선택 모달 */}
      {selectedStoreId && draft && (
        <ReservationMenuModal
          open={reserveMenuOpen}
          onOpenChange={(o: boolean) => {
            setReserveMenuOpen(o);
            if (!o) closeModalsOnly();
          }}
          restaurant={detailQuery.data ?? null}
          onConfirm={goConfirm}
          onBack={backToReserve}
          onClose={closeModalsOnly}
          draft={draft}
        />
      )}
      {/* 예약확인 페이지 모달 */}
      {selectedStoreId && draft && (
        <ReservationConfirmMoodal
          open={confirmOpen}
          onClose={closeModalsOnly}
          onBack={backToReserveMenu}
          onConfirm={goPayment}
          restaurant={detailQuery.data ?? null}
          draft={draft}
          booking={booking}
        />
      )}

      {/* 결제 모달 */}
      {selectedStoreId && draft && paymentOpen && booking && (
        <PaymentModal
          open={paymentOpen}
          onClose={closeModalsOnly}
          onOpenChange={setPaymentOpen}
          onBack={backToConfirm}
          restaurant={detailQuery.data ?? null}
          draft={draft}
          booking={booking}
        />
      )}
    </>
  );
}
