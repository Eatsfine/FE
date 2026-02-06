import z from "zod";

export const signupSchema = z
  .object({
    role: z.enum(["customer", "owner"]).default("customer"),

    name: z.string().min(1, "이름을 입력하세요."),

    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식이 아닙니다." }),

    phone: z
      .string()
      .min(1, { message: "휴대폰 번호를 입력해주세요." })
      // SignupDialog에서 phoneNumber 유틸을 통해 하이픈 강제 적용되므로, 데이터 일관성을 위해 엄격한 정규식을 유지
      .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
        message: "올바른 휴대폰 번호 형식이 아닙니다.",
      }),

    password: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),

    confirmPassword: z.string().min(1, "비밀번호를 다시 입력하세요."),

    terms: z.boolean().refine((v) => v === true, {
      message: "필수 약관에 동의해주세요.",
    }),

    privacy: z
      .boolean()
      .refine((v) => v === true, { message: "필수 약관에 동의해주세요." }),

    marketing: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.input<typeof signupSchema>;
