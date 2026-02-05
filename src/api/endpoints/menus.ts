import { api } from "../axios";

export type MenuCategory = "MAIN" | "SIDE" | "DRINK" | string;

export type MenuItem = {
  menuId: number;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  imageUrl?: string;
  isSoldOut: boolean;
};

type ApiResult<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

type MenuListResult = {
  menus: MenuItem[];
};

export async function getMenus(storeId: string): Promise<MenuItem[]> {
  const { data } = await api.get<ApiResult<MenuListResult>>(
    `/stores/${storeId}/menus`,
  );
  if (!data?.isSuccess) {
    throw {
      status: 0,
      code: data?.code,
      message: data?.message ?? "메뉴 목록 조회에 실패했습니다.",
    };
  }
  return data.result?.menus ?? [];
}
