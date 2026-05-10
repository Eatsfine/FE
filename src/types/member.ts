export interface MemberInfo {
  id: number;
  profileImage: string | null;
  email: string;
  name: string;
  phoneNumber: string;
}

export interface PatchMemberInfo {
  name?: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ChangePasswordResponse {
  change: boolean;
  changeAt: string;
  message: string;
}
