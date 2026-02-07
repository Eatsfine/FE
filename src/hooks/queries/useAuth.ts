import { postLogin, postSignup } from "@/api/auth";
import type { LoginFormValues } from "@/components/auth/login.schema";
import type { SignupFormValues } from "@/components/auth/signup.schema";
import { useAuthActions } from "@/stores/useAuthStore";
import type { ResponseLoginDto, ResponseSignupDto } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

// 이메일 회원가입 훅
export const useEmailSignup = () => {
  return useMutation<ResponseSignupDto, Error, SignupFormValues>({
    mutationFn: (data) => {
      const requestBody = {
        ...data,
        phoneNumber: data.phoneNumber.replace(/-/g, ""),
        marketingConsent: data.marketingConsent ?? false,
      };
      return postSignup(requestBody);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
};

// 이메일 로그인 훅
export const useEmailLogin = () => {
  const { login } = useAuthActions();

  return useMutation<ResponseLoginDto, Error, LoginFormValues>({
    mutationFn: (data: LoginFormValues) => postLogin(data),
    onSuccess: (response) => {
      login(response.accessToken);
    },
    onError: (error) => {
      console.error("이메일 로그인 실패:", error);
    },
  });
};
