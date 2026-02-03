import type { ApiResponse } from "@/types/api";
import type {
  RequestLoginDto,
  RequestSignupDto,
  ResponseLoginDto,
  ResponseLogoutDto,
  ResponseRefreshDto,
  ResponseSignupDto,
} from "@/types/auth";
import { api } from "./axios";

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

export const postLogout = async () => {
  const { data } =
    await api.post<ApiResponse<ResponseLogoutDto>>("/auth/logout");
  return data;
};

export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/";
};

export const logout = async () => {
  try {
    await postLogout();
  } catch (e) {
    console.error(e);
  } finally {
    clearAuth();
  }
};

export const postRefresh = async () => {
  const { data } =
    await api.post<ApiResponse<ResponseRefreshDto>>("/auth/refresh");
  return data;
};
