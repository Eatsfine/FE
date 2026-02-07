import { postLogin, postSignup } from "@/api/auth";
import type { LoginFormValues } from "@/components/auth/login.schema";
import type { SignupFormValues } from "@/components/auth/signup.schema";
import { useAuthActions } from "@/stores/useAuthStore";
import type { ApiError } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

// 이메일 회원가입 훅
export const useEmailSignup = () => {
  return useMutation({
    mutationFn: (data: SignupFormValues) => {
      const requestBody = {
        ...data,
        phoneNumber: data.phoneNumber.replace(/-/g, ""),
        marketingConsent: data.marketingConsent ?? false,
      };
      return postSignup(requestBody);
    },
    onError: (error: ApiError) => {
      console.error("회원가입 실패:", error);
    },
  });
};

// 이메일 로그인 훅
export const useEmailLogin = () => {
  const { login } = useAuthActions();

  return useMutation({
    mutationFn: (data: LoginFormValues) => postLogin(data),
    onSuccess: (response) => {
      login(response.accessToken);
    },
    onError: (error: ApiError) => {
      console.error("이메일 로그인 실패:", error);
    },
  });
};
