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
  profileImage: string | null;
  email: string;
  name: string;
  phoneNumber: string;
};
export async function getMemberInfo() {
  const res = await api.get<ApiEnvelope<MemberInfo>>("/api/v1/member/info");
  return res.data.result;
}

export type PatchMemberInfo = {
  name: string;
  phoneNumber: string;
};

export async function patchMemberInfo(body: PatchMemberInfo) {
  const res = await api.patch<ApiEnvelope<string>>("/api/v1/member/info", body);
  return res.data.result;
}
