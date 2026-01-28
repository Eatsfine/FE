import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string | undefined,
  timeout: 10000,
});

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status = err.response?.status;
    const data = err.response?.data;

    if (import.meta.env.DEV) {
      console.error("[api error]", {
        status,
        data,
        message: err.message,
        url: err.config?.url,
        method: err.config?.method,
      });
    }
    //Todo: 401 처리(로그아웃.리다이렉트,refresh)는 스펙 확정후
    return Promise.reject(err);
  },
);
