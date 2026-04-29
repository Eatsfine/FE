import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ openLogin: true }} />;
  }

  return <Outlet />;
};
