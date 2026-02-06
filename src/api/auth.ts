import type { ApiResponse } from "@/types/api";
import type {
  RequestLoginDto,
  RequestSignupDto,
  RequestSocialLoginDto,
  ResponseLoginDto,
  ResponseLogoutDto,
  ResponseRefreshDto,
  ResponseSignupDto,
} from "@/types/auth";
import { api } from "./axios";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ApiResponse<ResponseSignupDto>> => {
  const { data } = await api.post<ApiResponse<ResponseSignupDto>>(
    "/auth/signup",
    body,
  );
  return data;
};

export const postLogin = async (
  body: RequestLoginDto,
): Promise<ApiResponse<ResponseLoginDto>> => {
  const { data } = await api.post<ApiResponse<ResponseLoginDto>>(
    "/auth/login",
    body,
  );
  return data;
};

export const postSocialLogin = async (
  provider: "kakao" | "google",
  body: RequestSocialLoginDto,
): Promise<ApiResponse<ResponseLoginDto>> => {
  const { data } = await api.post<ApiResponse<ResponseLoginDto>>(
    `/auth/social/${provider}`,
    body,
  );
  return data;
};

export const postLogout = async () => {
  const { data } =
    await api.post<ApiResponse<ResponseLogoutDto>>("/auth/logout");
  return data;
};

export const clearAuth = () => {
  useAuthStore.getState().actions.logout();
};

// 로그아웃은 사용자 의도이므로 서버 실패와 무관하게 클라이언트 인증 정보를 제거
export const logout = async () => {
  try {
    await postLogout();
  } catch (e) {
    console.warn("서버 로그아웃 실패(하지만 클라이언트 로그아웃은 진행함):", e);
  } finally {
    clearAuth();
  }
};

export const postRefresh = async () => {
  const { data } = await axios.post<ApiResponse<ResponseRefreshDto>>(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
      timeout: 10000,
    },
  );
  return data;
};
