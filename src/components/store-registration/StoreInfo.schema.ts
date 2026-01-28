import z from "zod";

export const StoreInfoSchema = z.object({
  storeName: z.string().min(1, { message: "가게 이름을 입력하세요." }),
  category: z.string().min(1, { message: "음식 종류를 선택하세요." }),
  address: z.string().min(1, { message: "주소를 입력하세요." }),
  detailAddress: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: "전화번호를 입력하세요." })
    .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, {
      message: "올바른 전화번호 형식이 아닙니다.",
    }),
  openTime: z.string().min(1, { message: "시작 시간을 선택하세요." }),
  closeTime: z.string().min(1, { message: "종료 시간을 선택하세요." }),
  holidays: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export type StoreInfoFormValues = z.infer<typeof StoreInfoSchema>;
