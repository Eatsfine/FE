import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { isApiResponse, normalizeApiError } from "./api.error";
import type { ApiError } from "@/types/api";

const OWNER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvd25lckBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9PV05FUiIsImlhdCI6MTc3MDU3MDE5NywiZXhwIjo0OTI0MTcwMTk3fQ.0O8-mHTT6j59VTuMYmtGZs4r7JvqlsRi0jU09601iKs"
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
    config.headers.Authorization = `Bearer ${OWNER_TOKEN}`;
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

    if (apiError.status === 401) {
      // TODO: refresh or logout 정책 확정 후 구현
    }

    return Promise.reject(apiError);
  },
);
