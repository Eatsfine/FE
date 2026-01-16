import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import RestaurantList from "@/components/restaurant/RestaurantList";
import type { ReservationDraft, Restaurant } from "@/types/restaurant";
import RestaurantDetailModal from "@/components/restaurant/RestaurantDetailModal";
import { MOCK_RESTAURANTS } from "@/mock/restaurants";
import RestaurantMarker from "@/components/restaurant/RestaurantMarker";
import ReservationModal from "@/components/reservation/ReservationModal";
import ReservationConfirmMoodal from "@/components/reservation/ReservationConfirmModal";
import ReservationCompleteModal from "@/components/reservation/ReservationCompleteModal";
import PaymentModal from "@/components/reservation/PaymentModal";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draft, setDraft] = useState<ReservationDraft | null>(null);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const openDetail = (restaurant: Restaurant) => {
    setSelected(restaurant);
    setDraft(null);
    setConfirmOpen(false);
    setReserveOpen(false);
    setDetailOpen(true);
  };

  const goReserve = () => {
    setDetailOpen(false);
    setReserveOpen(true);
  };

  const backToDetail = () => {
    setReserveOpen(false);
    setDetailOpen(true);
  };

  const goConfirm = (d: ReservationDraft) => {
    setDraft(d);
    setReserveOpen(false);
    setConfirmOpen(true);
  };

  const backToReserve = () => {
    setReserveOpen(true);
    setConfirmOpen(false);
  };

  const goPayment = () => {
    setConfirmOpen(false);
    setPaymentOpen(true);
  };

  const closeAll = () => {
    setDetailOpen(false);
    setReserveOpen(false);
    setConfirmOpen(false);
    setSelected(null);
    setDraft(null);
    setCompleteOpen(false);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];
    return MOCK_RESTAURANTS.filter((r) => {
      const name = r.name.toLowerCase();
      const category = (r.category ?? "").toLowerCase();
      const address = r.address.toLowerCase();
      return name.includes(q) || category.includes(q) || address.includes(q);
    });
  }, [query]);

  const handleSelect = (restaurant: Restaurant) => {
    openDetail(restaurant);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-blue-600">잇츠파인</h1>
          <p className="text-gray-600">
            원하는 자리를 직접 선택하는 스마트 식당 예약
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 검색창 */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="식당 이름, 지역, 음식 종류로 검색해보세요"
              className="w-full px-5 py-4 pr-14 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              aria-label="검색"
              onClick={() => {}} //버튼은 지금 UI용으로
            >
              <Search className="size-5" />
            </button>
          </div>
        </div>

        {/* 지도는 API연동을 위해 지금 비워둠 */}
        <div className="relative w-full h-125 bg-gray-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p>카카오맵 API 연동 영역</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-10">
            {results.map((r) => (
              <RestaurantMarker
                key={r.id}
                restaurant={r}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 w-full max-w-2xl mx-auto">
          {query.trim() ? (
            <RestaurantList restaurants={results} onSelect={handleSelect} />
          ) : null}
        </div>
      </main>
      {/* 상세 페이지 모달 */}
      {selected && (
        <RestaurantDetailModal
          open={detailOpen}
          onOpenChange={(o: boolean) => {
            setDetailOpen(o);
            if (!o) closeAll();
          }}
          restaurant={selected}
          onClickReserve={goReserve}
        />
      )}
      {/* 예약 페이지 모달 */}
      {selected && (
        <ReservationModal
          open={reserveOpen}
          onOpenChange={(o: boolean) => {
            setReserveOpen(o);
            if (!o) closeAll();
          }}
          restaurant={selected}
          onClickConfirm={goConfirm}
          onBack={backToDetail} //X표시 누르면 상세페이지 모달로 이동
        />
      )}
      {/* 예약확인 페이지 모달 */}
      {selected && draft && (
        <ReservationConfirmMoodal
          open={confirmOpen}
          onClose={closeAll}
          onBack={backToReserve} //X표시 누르면 예약페이지 모달로 이동
          onConfirm={goPayment}
          restaurant={selected}
          draft={draft}
        />
      )}

      {/* 결제 모달 */}
      {selected && draft && (
        <PaymentModal
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          restaurant={selected}
          draft={draft}
          onSuccess={() => {
            setCompleteOpen(true); //결제 성공 완료모달
          }}
        />
      )}
      {/* 예약완료 페이지 모달 */}
      {selected && draft && (
        <ReservationCompleteModal
          open={completeOpen}
          restaurant={selected}
          draft={draft}
          onClose={closeAll}
          autoCloseMs={5000}
        />
      )}
    </div>
  );
}
