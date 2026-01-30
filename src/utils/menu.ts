import type { MenuItem, SelectedMenu } from "@/types/menus";

export function calcMenuTotal(menus: MenuItem[], selected: SelectedMenu[]) {
  const priceMap = new Map(menus.map((m) => [m.id, m.price]));
  return selected.reduce(
    (sum, s) => sum + (priceMap.get(s.menuId) ?? 0) * s.quantity,
    0,
  );
}
