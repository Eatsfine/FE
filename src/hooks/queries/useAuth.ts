import { patchVerifyOwner, postLogin, postSignup } from "@/api/auth";
import type { LoginFormValues } from "@/components/auth/login.schema";
import type { SignupFormValues } from "@/components/auth/signup.schema";
import type { BusinessAuthFormValues } from "@/components/store-registration/BusinessAuth.schema";
import { useAuthActions } from "@/stores/useAuthStore";
import type {
  ResponseLoginDto,
  ResponseVerifyOwnerDto,
  ResponseSignupDto,
} from "@/types/auth";
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

// 사장 인증 훅
export const useVerifyOwner = () => {
  return useMutation<ResponseVerifyOwnerDto, Error, BusinessAuthFormValues>({
    mutationFn: (data: BusinessAuthFormValues) => patchVerifyOwner(data),
    onSuccess: () => {
      alert(
        "사업자 인증이 완료되었습니다. \n사장님 권한 적용을 위해 반드시 재로그인해주세요.",
      );
    },
    onError: (error) => {
      console.error("사장 인증 실패:", error);
    },
  });
};
