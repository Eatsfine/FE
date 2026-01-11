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

export const queryClient = new QueryClient();

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Intro />,
    errorElement: <NotFound />,
  },
  {
    path: "/search",
    element: <SearchPage />,
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
