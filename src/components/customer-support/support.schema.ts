import z from "zod";

export const supportSchema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),

  email: z
    .string()
    .min(1, { message: "이메일을 입력하세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),

  category: z.enum([
    "예약",
    "결제/환불",
    "식당 등록",
    "리뷰",
    "기술 지원",
    "기타",
  ]),
  subject: z.string().min(1, { message: "제목을 입력하세요." }),
  message: z
    .string()
    .min(1, { message: "문의하실 내용을 자세히 입력하세요." }),
});

export type SupportFormValues = z.infer<typeof supportSchema>;
