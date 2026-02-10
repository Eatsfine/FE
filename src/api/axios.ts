import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { isApiResponse, normalizeApiError } from "./api.error";
import type { ApiError } from "@/types/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string | undefined,
  timeout: 10000,
});

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  const ownerApiPaths = [
    "/owner",
    "/stores/",
  ];

  const isOwnerApi = ownerApiPaths.some((path) =>
    config.url?.includes(path)
  );

  if (isOwnerApi) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

  (err: AxiosError) => {
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

    return Promise.reject(apiError);
  },
);
