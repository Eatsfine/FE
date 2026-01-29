import { z } from "zod";

export const MenuSchema = z.object({
  menus: z
    .array(
      z.object({
        menuName: z.string().min(1, "메뉴명을 입력하세요."),
        price: z
          .string()
          .min(1, "가격을 입력하세요.")
          .regex(/^\d+$/, "숫자만 입력해주세요."),
        description: z.string().optional(),
        image: z.any().optional(),
      }),
    )
    .optional(),
});

export type MenuFormValues = z.infer<typeof MenuSchema>;
