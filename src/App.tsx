import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/myPage/myPage";
import CustomerSupportPage from "./pages/CustomerSupportPage";
import PublicLayout from "./layouts/PublicLayout";

export const queryClient = new QueryClient();

const routes: RouteObject[] = [
  {
    element: (
      <PublicLayout
        title="잇츠파인"
        subtitle="원하는 자리를 직접 선택하는 스마트 식당 예약"
      />
    ),
    errorElement: <NotFound />,
    children: [{ path: "/search", element: <SearchPage /> }],
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
    path: "/mypage/*",
    element: <MyPage />,
    errorElement: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
