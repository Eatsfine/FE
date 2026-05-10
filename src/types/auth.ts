export interface RequestSignupDto {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  tosConsent: boolean;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export interface ResponseSignupDto {
  id: number;
  createdAt: string;
}

export interface RequestLoginDto {
  email: string;
  password: string;
}

export interface ResponseLoginDto {
  id: number;
  accessToken: string;
  refreshToken: string | null;
}

export type ResponseLogoutDto = string;

export interface ResponseRefreshDto {
  accessToken: string;
}

export interface RequestVerifyOwnerDto {
  businessNumber: string;
  startDate: string;
}

export interface ResponseVerifyOwnerDto {
  businessNumber: string;
  startDate: string;
}
