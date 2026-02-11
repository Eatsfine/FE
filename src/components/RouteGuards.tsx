import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  // 비로그인 홈화면으로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ openLogin: true }} />;
  }

  return <Outlet />;
};
