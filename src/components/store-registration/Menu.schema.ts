import { z } from "zod";

export const CategoryEnum = z.enum(["MAIN", "SIDE", "BEVERAGE", "ALCOHOL"]);

export const MenuSchema = z.object({
  menus: z.array(
    z.object({
      name: z.string().min(1, "메뉴명을 입력하세요."),
      description: z.string().optional(),
      price: z
        .string()
        .min(1, "가격을 입력하세요.")
        .regex(/^\d+$/, "숫자만 입력해주세요."),
      category: CategoryEnum,
      imageKey: z.any().optional(),
    }),
  ),
});

export type MenuFormValues = z.infer<typeof MenuSchema>;
