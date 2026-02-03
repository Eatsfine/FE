export type RequestSignupDto = {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: "customer" | "owner";
};

export type ResponseSignupDto = {
  userId: string;
  email: string;
  name: string;
  role: "customer" | "owner";
};

export type RequestLoginDto = {
  email: string;
  password: string;
};

export type ResponseLoginDto = {
  accessToken: string;
  user: {
    userId: string;
    email: string;
    name: string;
    role: "customer" | "owner";
  };
};

export type RequestSocialLoginDto = {
  accessToken: string;
};

export type ResponseLogoutDto = null;

export type ResponseRefreshDto = {
  accessToken: string;
};
