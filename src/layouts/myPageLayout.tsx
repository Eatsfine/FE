import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Calendar,
  CreditCard,
  Crown,
  Settings,
  Store,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { to: "/mypage/info", label: "내 정보", icon: User },
  { to: "/mypage/settings", label: "계정 설정", icon: Settings },
  { to: "/mypage/payment", label: "결제수단", icon: CreditCard },
  { to: "/mypage/subscription", label: "구독 관리", icon: Crown },
  { to: "/mypage/reservations", label: "예약 현황", icon: Calendar },
  { to: "/mypage/store", label: "내 가게 관리", icon: Store },
];

export default function MyPageLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <div className="text-lg text-blue-500 font-medium cursor-pointer hover:text-blue-700 transition">
              잇츠파인 Eatsfine
            </div>
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 text-md text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            로그아웃
          </button>
        </div>
      </header>

      {/* Page Title */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xl text-gray-900">마이페이지</p>
        <p className="mt-2 text-md text-gray-600">
          계정 정보와 예약 내역을 관리하세요
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-60 rounded-xl bg-white shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              {sidebarItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-12 items-center gap-3 px-5 py-7 text-md font-medium transition",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 h-full w-1 bg-blue-500" />
                      )}
                      <Icon size={18} />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Right content */}
          <main className="w-full flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
