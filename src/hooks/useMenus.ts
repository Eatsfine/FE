import { mockMenusByRestaurantId } from "@/mock/menus";
import type { MenuItem } from "@/types/menus";
import { useMemo } from "react";

export function useMenus(restaurantId: string) {
  const menus: MenuItem[] = useMemo(() => {
    return mockMenusByRestaurantId[restaurantId] ?? [];
  }, [restaurantId]);

  const activeMenus = useMemo(() => menus.filter((m) => m.isActive), [menus]);

  return { menus, activeMenus };
}
