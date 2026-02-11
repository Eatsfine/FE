import { api } from "../axios";

type ApiEnvelope<T> = {
  isSuccess?: boolean;
  success?: boolean;
  code?: string;
  message?: string;
  result: T;
};

export type MemberInfo = {
  id: number;
  profileImage: string;
  email: string;
  name: string;
  phoneNumber: string;
};
export async function getMemberInfo() {
  const res = await api.get<ApiEnvelope<MemberInfo>>("/api/v1/member/info");
  return res.data.result;
}

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type ChangePasswordResponse = {
  change: boolean;
  changeAt: string;
  message: string;
};
export async function putChangePassword(body: ChangePasswordResponse) {
  const res = await api.put<ApiEnvelope<ChangePasswordResponse>>(
    "/api/v1/member/password",
    body,
  );
  return res.data.result;
}

export async function deleteWithDraw() {
  const res = await api.delete<string>(`/api/auth/withdraw`);
  return res.data;
}
