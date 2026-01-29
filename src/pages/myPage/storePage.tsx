
import { Store, Calendar, Star, Plus, ChevronRight, BarChart3 } from "lucide-react";
import { cn } from "../../lib/cn";
import { Link } from "react-router-dom";


export default function StorePage() {
  const stats = [
    {
      label: "총 가게 수",
      value: "3개",
      icon: <Store size={20} />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "총 예약 수",
      value: "2126건",
      icon: <Calendar size={20} />,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      label: "평균 평점",
      value: "4.8",
      icon: <Star size={20} />,
      bgColor: "bg-green-50",
      iconColor: "text-yellow-500",
    },
  ];

  const shops = [
    {
      id: 1,
      name: "더 플레이스 강남점",
      status: "운영중",
      address: "서울 강남구 테헤란로 123",
      category: "이탈리안",
      totalReservations: "1234건",
      rating: "4.8",
      reviews: "256개",
    },
    {
      id: 2,
      name: "일식당 스시마루",
      status: "운영중",
      address: "서울 강남구 논현로 456",
      category: "일식",
      totalReservations: "892건",
      rating: "4.9",
      reviews: "189개",
    },
    {
      id: 3,
      name: "한식당 정",
      status: "승인 대기",
      address: "서울 종로구 인사동길 321",
      category: "한식",
      totalReservations: "-",
      rating: "-",
      reviews: "-",
      notice:
        "가게 승인 대기 중입니다. 영업일 기준 1-2일 내에 승인이 완료됩니다.",
    },
  ];

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg text-gray-900">내 가게 관리</h2>
          <p className="mt-1 text-sm text-gray-500">
            등록한 식당을 관리하고 대시보드로 이동하세요
          </p>
        </div>
        <Link 
          to="/mypage/store/register" 
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors">
          <Plus size={18} /> 새 가게 등록
        </Link>
      </div>

      {/* 요약 통계 카드 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between p-5 rounded-xl border border-gray-50",
              stat.bgColor,
            )}
          >
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl text-gray-900">{stat.value}</p>
            </div>
            <div className={stat.iconColor}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* 가게 리스트 */}
      <div className="space-y-4 mb-8">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="group relative rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                  <Store size={30} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-md text-gray-900">{shop.name}</h3>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-sm",
                        shop.status === "운영중"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600",
                      )}
                    >
                      {shop.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{shop.address}</p>
                  <span className="text-[11px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100">
                    {shop.category}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-300 group-hover:text-gray-500 transition-colors"
              />
            </div>

            {/* 가게별 상세 수치: 승인 대기일 때는 아예 렌더링하지 않음 */}
            {shop.status !== "승인 대기" && (
              <div className="grid grid-cols-3 py-4 border-t border-gray-100 text-center">
                <div>
                  <p className="text-[11px] text-gray-400 mb-1 font-medium">
                    총 예약
                  </p>
                  <p className="text-sm text-gray-700">
                    {shop.totalReservations}
                  </p>
                </div>
                <div className="border-x border-gray-100">
                  <p className="text-[11px] text-gray-400 mb-1 font-medium">
                    평점
                  </p>
                  <p className="text-sm text-gray-700 flex items-center justify-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />{" "}
                    {shop.rating}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-1 font-medium">
                    리뷰
                  </p>
                  <p className="text-sm text-gray-700">{shop.reviews}</p>
                </div>
              </div>
            )}

            {/* 승인 대기 알림창: 승인 대기일 때만 표시 */}
            {shop.status === "승인 대기" && shop.notice && (
              <div className="mt-4 p-4 bg-yellow-50/50 rounded-xl border border-yellow-100/50">
                <p className="text-sm text-yellow-700 leading-relaxed font-medium">
                  {shop.notice}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 프리미엄 홍보 배너 */}
      <div className="rounded-2xl bg-blue-50/50 p-6 items-center border border-blue-100/50">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white text-blue-500 shadow-sm border border-blue-50">
            <BarChart3 size={24} />
          </div>
          <div>
            <h4 className="text-sm text-gray-900">
              더 많은 데이터가 필요하신가요?
            </h4>
            <p className="text-xs text-gray-500 mt-1 ">
              프리미엄 플랜으로 업그레이드하고 AI 데이터 인사이트, 상세 분석
              리포트를 받아보세요.
            </p>
          </div>
        </div>
        <button className="cursor-pointer mt-6 w-full sm:w-auto px-10 py-3 rounded-lg bg-blue-500 text-xs font-bold text-white hover:bg-blue-600 shadow-sm transition-all">
          프리미엄 플랜 알아보기
        </button>
      </div>
    </section>
  );
}
