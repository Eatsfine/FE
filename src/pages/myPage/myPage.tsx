import { Routes, Route, Navigate } from "react-router-dom";
import MyPageLayout from "../../layouts/myPageLayout";
import MyInfoPage from "./myInfoPage";
import SettingPage from "./settingPage";
import PaymentPage from "./paymentPage";
import SubscriptionPage from "./subscriptionPage";
import ReservationPage from "./reservationPage";
import StorePage from "./storePage";

export default function MyPage() {
  return (
    <Routes>
      <Route element={<MyPageLayout />}>
        <Route index element={<Navigate to="info" />} />
        <Route path="info" element={<MyInfoPage />} />
        <Route path="settings" element={<SettingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="reservations" element={<ReservationPage />} />
        <Route path="store" element={<StorePage />} />
      </Route>
    </Routes>
  );
}
