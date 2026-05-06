export type MemberInfo = {
  id: number;
  profileImage: string | null;
  email: string;
  name: string;
  phoneNumber: string;
};

export type PatchMemberInfo = {
  name: string;
  phoneNumber: string;
};

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
