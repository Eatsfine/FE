import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";
import SearchPage from "./pages/SearchPage";
import CustomerSupportPage from "./pages/CustomerSupportPage";
import PublicLayout from "./layouts/PublicLayout";
import StoreRegistrationPage from "./pages/myPage/StoreRegistrationPage";
import MyPageLayout from "./layouts/myPageLayout";
import MyInfoPage from "./pages/myPage/myInfoPage";
import SettingsPage from "./pages/myPage/settingPage";
import PaymentPage from "./pages/myPage/paymentPage";
import SubscriptionPage from "./pages/myPage/subscriptionPage";
import ReservationPage from "./pages/myPage/reservationPage";
import StorePage from "./pages/myPage/storePage";
import OwnerPage from "./pages/ownerPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import LoginErrorPage from "./pages/LoginErrorPage";

const routes: RouteObject[] = [
  { path: "/oauth/callback", element: <OAuthCallbackPage /> },
  { path: "/login/error", element: <LoginErrorPage /> },
  {
    element: <PublicLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/search", element: <SearchPage /> },
      {
        path: "/mypage",
        element: <MyPageLayout />,
        children: [
          { index: true, element: <Navigate to="info" replace /> },
          { path: "info", element: <MyInfoPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "payment", element: <PaymentPage /> },
          { path: "subscription", element: <SubscriptionPage /> },
          { path: "reservations", element: <ReservationPage /> },
          { path: "store", element: <StorePage /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Intro />,
    errorElement: <NotFound />,
  },

  {
    path: "/customer-support",
    element: <CustomerSupportPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/mypage/store/register",
    element: <StoreRegistrationPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/mypage/store/:storeId",
    element: <OwnerPage />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
