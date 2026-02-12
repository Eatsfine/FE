import { Calendar, Clock, User, CreditCard, Pencil, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ReservationStatus = "전체" | "예정된 예약" | "방문 완료" | "취소된 예약";

type Reservation = {
  id: number;
  shopName: string;
  status: "예약 확정" | "방문 완료" | "취소됨";
  address: string;
  date: string;
  time: string;
  people: string;
  payment: string;
  method: string;
  step: string;
};

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<ReservationStatus>("전체");
  const [reservations] = useState<Reservation[]>([]);

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
        <h2 className="text-xl font-medium">예약 현황</h2>
        <p className="mt-0.5 text-sm text-gray-600">
          내 예약 내역을 확인하고 관리하세요
        </p>
      </div>

      <div className="flex gap-6 border-b border-gray-100 mb-8">
        {["전체", "예정된 예약", "방문 완료", "취소된 예약"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as ReservationStatus)}
            className={cn(
              "cursor-pointer pb-4 font-medium transition-all relative",
              activeTab === tab ? "text-blue-600" : "hover:text-gray-700",
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((res) => (
            <div
              key={res.id}
              className="rounded-2xl border border-gray-200 p-6 transition-hover hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <h3 className="text-xl font-medium">{res.shopName}</h3>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        res.status === "예약 확정"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600",
                        res.status === "방문 완료" &&
                          "bg-green-50 text-green-600",
                        res.status === "취소됨" && "bg-gray-100 text-gray-500",
                      )}
                    >
                      {res.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{res.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8 pb-6 border-b border-gray-200 mb-4">
                <InfoItem
                  icon={<Calendar size={18} />}
                  label="예약 날짜"
                  value={res.date}
                />
                <InfoItem
                  icon={<Clock size={18} />}
                  label="예약 시간"
                  value={res.time}
                />
                <InfoItem
                  icon={<User size={18} />}
                  label="인원"
                  value={res.people}
                />
                <InfoItem
                  icon={<CreditCard size={18} />}
                  label="결제 정보"
                  value={`${res.payment}\n${res.method}`}
                  isMultiLine
                />
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-medium",
                    res.status === "취소됨"
                      ? "text-gray-400"
                      : "text-green-600",
                  )}
                >
                  {res.step}
                </span>
                <div className="flex gap-3">
                  {res.status === "예약 확정" && (
                    <>
                      <button className="cursor-pointer flex items-center gap-1 px-5 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-200 transition tracking-wide">
                        <Pencil size={16} /> 수정
                      </button>
                      <button className="cursor-pointer flex items-center gap-1 px-5 py-3 rounded-lg border border-red-500 text-sm font-medium text-red-500 hover:bg-red-100 transition tracking-wide">
                        <X size={16} /> 취소
                      </button>
                    </>
                  )}
                  {res.status === "방문 완료" && (
                    <button className="cursor-pointer px-7 py-3 rounded-lg bg-blue-500 text-sm font-bold text-white hover:bg-blue-600 transition">
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

function InfoItem({
  icon,
  label,
  value,
  isMultiLine = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isMultiLine?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-blue-100 text-blue-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-400 mb-0.5">{label}</p>
        <p className={cn("", isMultiLine ? "whitespace-pre-line" : "")}>
          {value}
        </p>
      </div>
    </div>
  );
}
