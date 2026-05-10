import type { ApiResponse } from "@/types/api";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  MemberInfo,
  PatchMemberInfo,
} from "@/types/member";

import { api } from "../axios";

export async function getMemberInfo() {
  const res = await api.get<ApiResponse<MemberInfo>>("/api/v1/member/info");
  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message ?? "회원정보 조회 실패");
  }
  return res.data.result;
}

export async function patchMemberInfo(body: PatchMemberInfo) {
  const res = await api.patch<ApiResponse<string>>("/api/v1/member/info", body);
  if (!res.data?.isSuccess) {
    throw new Error(res.data?.message ?? "회원정보 수정 실패");
  }
  return res.data.result;
}

export async function putProfileImage(file: File) {
  const formData = new FormData();
  formData.append("profileImage", file);
  const res = await api.put<ApiResponse<string>>("/api/v1/member/profile-image", formData);
  if (!res.data.isSuccess) {
    throw new Error(res.data.message ?? "프로필 업로드 실패");
  }
  return res.data.result;
}

export async function putChangePassword(body: ChangePasswordRequest) {
  const res = await api.put<ApiResponse<ChangePasswordResponse>>("/api/v1/member/password", body);
  if (!res.data?.isSuccess) {
    throw new Error(res.data.message ?? "비밀번호 변경에 실패했습니다");
  }
  return res.data.result;
}

export async function deleteWithDraw() {
  const res = await api.delete<string>(`/api/auth/withdraw`);
  return res.data;
}
