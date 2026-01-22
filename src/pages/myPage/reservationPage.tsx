import { Calendar, Clock, User, CreditCard, Pencil, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/cn";

type ReservationStatus = "전체" | "예정된 예약" | "방문 완료" | "취소된 예약";

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<ReservationStatus>("전체");

  const reservations = [
    {
      id: 1,
      shopName: "더 플레이스 강남점",
      status: "예약 확정",
      address: "서울 강남구 테헤란로 123",
      date: "2025-12-01",
      time: "18:30",
      people: "4명 / 테이블 A-05",
      payment: "₩50,000",
      method: "신한카드 (****1234)",
      step: "결제 완료",
    },
    {
      id: 2,
      shopName: "이탈리안 키친",
      status: "예약 확정",
      address: "서울 서초구 서초대로 456",
      date: "2025-11-28",
      time: "19:00",
      people: "2명 / 테이블 B-12",
      payment: "₩80,000",
      method: "카카오페이",
      step: "결제 완료",
    },
    {
      id: 3,
      shopName: "스시 마스터",
      status: "방문 완료",
      address: "서울 강남구 논현로 789",
      date: "2025-11-20",
      time: "20:00",
      people: "3명 / 테이블 C-03",
      payment: "₩120,000",
      method: "토스페이",
      step: "결제 완료",
    },
    {
      id: 4,
      shopName: "한식당 정",
      status: "취소됨",
      address: "서울 종로구 인사동길 321",
      date: "2025-11-15",
      time: "12:30",
      people: "5명 / 테이블 D-07",
      payment: "₩90,000",
      method: "신한카드 (****1234)",
      step: "환불 완료",
    },
  ];

  // 필터링 로직: 이 변수를 사용하여 렌더링합니다.
  const filteredReservations = reservations.filter((res) => {
    if (activeTab === "전체") return true;
    if (activeTab === "예정된 예약") return res.status === "예약 확정";
    if (activeTab === "방문 완료") return res.status === "방문 완료";
    if (activeTab === "취소된 예약") return res.status === "취소됨";
    return true;
  });

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-lg text-gray-900">예약 현황</h2>
        <p className="mt-1 text-sm text-gray-800">내 예약 내역을 확인하고 관리하세요</p>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-6 border-b border-gray-100 mb-8">
        {["전체", "예정된 예약", "방문 완료", "취소된 예약"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ReservationStatus)}
            className={cn(
              "cursor-pointer pb-4 text-sm font-medium transition-all relative",
              activeTab === tab ? "text-blue-600" : "text-gray-800 hover:text-gray-600"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* 예약 리스트: reservations 대신 filteredReservations를 사용합니다. */}
      <div className="space-y-6">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res) => (
            <div key={res.id} className="rounded-2xl border border-gray-200 p-6 transition-hover hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-md text-gray-900">{res.shopName}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[11px]",
                      res.status === "예약 확정" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600",
                      res.status === "방문 완료" && "bg-green-50 text-green-600",
                      res.status === "취소됨" && "bg-gray-100 text-gray-500"
                    )}>
                      {res.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{res.address}</p>
                </div>
              </div>

              {/* 상세 정보 그리드 */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 pb-6 border-b border-gray-200 mb-4">
                <InfoItem icon={<Calendar size={18} />} label="예약 날짜" value={res.date} />
                <InfoItem icon={<Clock size={18} />} label="예약 시간" value={res.time} />
                <InfoItem icon={<User size={18} />} label="인원" value={res.people} />
                <InfoItem icon={<CreditCard size={18} />} label="결제 정보" value={`${res.payment}\n${res.method}`} isMultiLine />
              </div>

              {/* 하단 버튼 영역 */}
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-sm font-medium",
                  res.status === "취소됨" ? "text-gray-400" : "text-green-600"
                )}>{res.step}</span>
                <div className="flex gap-2">
                  {res.status === "예약 확정" && (
                    <>
                      <button className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Pencil size={14} /> 수정
                      </button>
                      <button className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                        <X size={14} /> 취소
                      </button>
                    </>
                  )}
                  {res.status === "방문 완료" && (
                    <button className="cursor-pointer px-6 py-2 rounded-lg bg-blue-500 text-sm font-bold text-white hover:bg-blue-600 transition-colors">
                      리뷰 작성
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-400 text-sm">
            해당 내역이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}

// 정보 아이템 컴포넌트
function InfoItem({ icon, label, value, isMultiLine = false }: { icon: React.ReactNode, label: string, value: string, isMultiLine?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-blue-100 text-blue-500">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
        <p className={cn("text-sm text-gray-900", isMultiLine ? "whitespace-pre-line" : "")}>
          {value}
        </p>
      </div>
    </div>
  );
}