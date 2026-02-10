import { logout } from "@/api/auth";
import { useIsAuthenticated } from "@/stores/useAuthStore";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function PublicLayout() {
  const nav = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleLogout = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;

    await logout();
    alert("로그아웃 되었습니다.");
    nav("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full border-b bg-white sticky top-0 z-40 py-2">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/eatsfineLogo.svg"
              alt="잇츠파인 로고"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-blue-600 text-xl font-semibold">잇츠파인</h1>
              <p className="text-xs">원하는 자리를 선택하는 스마트 식당 예약</p>
            </div>
          </Link>
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-black hover:text-gray-600 transition cursor-pointer"
            >
              로그아웃
            </button>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
