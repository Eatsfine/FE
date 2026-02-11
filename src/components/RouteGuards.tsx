import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요한 서비스입니다.");
    }
  }, [isAuthenticated]);

  // 비로그인 홈화면으로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ openLogin: true }} />;
  }

  return <Outlet />;
};
