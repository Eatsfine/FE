import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { isApiResponse, normalizeApiError } from "./api.error";
import type { ApiError } from "@/types/api";
import { clearAuth, postRefresh } from "./auth";
import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string | undefined,
  timeout: 10000,
});

function getAccessToken() {
  return useAuthStore.getState().accessToken;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: ReturnType<typeof postRefresh> | null = null;

api.interceptors.response.use(
  (res) => {
    const data = res.data;

    if (isApiResponse(data) && data.isSuccess === false) {
      const apiError: ApiError = {
        status: res.status,
        code: data.code,
        message: data.message,
      };

      return Promise.reject(apiError);
    }
    return res;
  },

  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const apiError: ApiError = normalizeApiError(err);

    if (import.meta.env.DEV) {
      console.error("[api error]", {
        status: apiError.status,
        code: apiError.code,
        message: apiError.message,
        url: err.config?.url,
        method: err.config?.method,
      });
    }

    if (apiError.status === 401 && originalRequest) {
      // 이미 재시도한 요청이거나, 재발급 요청 자체가 실패인 경우 -> 로그아웃
      if (
        originalRequest._retry ||
        originalRequest.url?.includes("/api/auth/reissue")
      ) {
        clearAuth();
        return Promise.reject(apiError);
      }

      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        // 이미 진행 중인 재발급 있으면 그 결과 재사용
        if (!refreshPromise) {
          refreshPromise = postRefresh().finally(() => {
            refreshPromise = null;
          });
        }

        const result = await refreshPromise;

        if (result && result.accessToken) {
          const newAccessToken = result.accessToken;

          // 새 토큰 저장
          useAuthStore.getState().actions.login(newAccessToken);

          // 실패했던 요청의 헤더를 새 토큰으로 교체
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // 재시도
          return api(originalRequest);
        }

        clearAuth();
        return Promise.reject(apiError);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃 처리
        console.error("토큰 재발급 실패:", refreshError);
        clearAuth();

        if (axios.isAxiosError(refreshError)) {
          return Promise.reject(normalizeApiError(refreshError));
        }

        const unknownError: ApiError = {
          status: 0,
          code: "UNKNOWN_REFRESH_ERROR",
          message: "토큰 재발급 중 알 수 없는 오류가 발생했습니다.",
        };

        return Promise.reject(unknownError);
      }
    }

    return Promise.reject(err);
  },
);
