import { Store, Calendar, Star, Plus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function StorePage() {
  const shops: Array<{
    id: string;
    name: string;
    isApproved: boolean;
    address: string;
    category: string;
    totalReservations: string;
    rating: string;
    reviews: string;
    notice?: string;
  }> = [];

  const stats = [
    {
      label: "총 가게 수",
      value: `${shops.length}개`,
      icon: <Store size={20} />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "총 예약 수",
      value: "-",
      icon: <Calendar size={20} />,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      label: "평균 평점",
      value: "-",
      icon: <Star size={20} />,
      bgColor: "bg-green-50",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <section className="rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium">내 가게 관리</h2>
          <p className="mt-0.5 text-sm text-gray-600">
            등록한 식당을 관리하고 대시보드로 이동하세요
          </p>
        </div>
        <Link
          to="/mypage/store/register"
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-700 transition"
        >
          <Plus size={18} /> 새 가게 등록
        </Link>
      </div>

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

      <div className="space-y-4 mb-8">
        {shops.length === 0 && (
          <div className="py-14 text-center text-gray-500">
            등록된 가게가 없습니다. 우측 상단에서 새 가게를 등록해주세요.
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-blue-50/50 p-6 items-center border border-blue-100/50">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white text-blue-500 shadow-sm border border-blue-50">
            <BarChart3 size={24} />
          </div>
          <div>
            <h4>더 많은 데이터가 필요하신가요?</h4>
            <p className="text-sm text-gray-500 mt-1 ">
              프리미엄 플랜으로 업그레이드하고 AI 데이터 인사이트, 상세 분석
              리포트를 받아보세요.
            </p>
          </div>
        </div>
        <button className="cursor-pointer mt-6 w-full sm:w-auto px-8 py-4 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600 shadow-sm transition">
          프리미엄 플랜 알아보기
        </button>
      </div>
    </section>
  );
}
