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

    if (isApiResponse(data) && data.success === false) {
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
        originalRequest.url?.includes("/auth/refresh")
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

        const response = await refreshPromise;

        // 재발급은 성공했지만 서버에서 실패 응답을 준 경우
        if (!response.success) {
          clearAuth();
          return Promise.reject(apiError);
        }

        if (response.success) {
          const newAccessToken = response.data.accessToken;

          // 새 토큰 저장
          useAuthStore.getState().actions.login(newAccessToken);

          // 실패했던 요청의 헤더를 새 토큰으로 교체
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // 재시도
          return api(originalRequest);
        }
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃 처리
        console.error("토큰 재발급 실패:", refreshError);
        clearAuth();
        return Promise.reject(normalizeApiError(refreshError as AxiosError));
      }
    }

    return Promise.reject(apiError);
  },
);
