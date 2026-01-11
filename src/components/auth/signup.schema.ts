import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "이름을 입력하세요."),

    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식이 아닙니다." }),

    phone: z
      .string()
      .min(1, { message: "휴대폰 번호를 입력해주세요." })
      .regex(/^010\d{8}$/, {
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
