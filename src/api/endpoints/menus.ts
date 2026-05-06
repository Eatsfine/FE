import type { ApiResponse } from "@/types/api";
import type { MenuCategory, MenuItem, MenuListResult } from "@/types/menus";

import { api } from "../axios";

export async function getMenus(storeId: string): Promise<MenuItem[]> {
  const { data } = await api.get<ApiResponse<MenuListResult>>(`/api/v1/stores/${storeId}/menus`);
  if (!data?.isSuccess) {
    throw {
      status: 0,
      code: data?.code,
      message: data?.message ?? "메뉴 목록 조회에 실패했습니다.",
    };
  }
  const menus = data.result?.menus ?? [];

  return menus.map((m) => ({
    id: String(m.menuId),
    restaurantId: String(storeId),
    name: m.name,
    category: m.category as MenuCategory,
    description: m.description ?? "",
    imageUrl: m.imageUrl ?? "",
    price: m.price,
    isSoldOut: m.isSoldOut,
    isActive: true, //서버에 없어서 임시로 달아둠.
  }));
}
