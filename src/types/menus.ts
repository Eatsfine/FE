export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  category: MenuCategory;
  description?: string;
  imageUrl?: string;
  imageKey?: string;
  price: number;
  isSoldOut: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SelectedMenu = {
  menuId: string;
  quantity: number;
};

export type MenuCategory = "MAIN" | "SIDE" | "BEVERAGE" | "ALCOHOL";

export type UiCategory = MenuCategory | "OTHER";

export const MenuCategoryLabel: Record<MenuCategory, string> = {
  MAIN: "메인 메뉴",
  SIDE: "사이드 메뉴",
  BEVERAGE: "음료",
  ALCOHOL: "주류",
};
export const UiMenuCategoryLabel: Record<UiCategory, string> = {
  ...MenuCategoryLabel,
  OTHER: "기타",
};

export type MenuCreateItemDto = {
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  imageKey?: string;
};

export type RequestMenuCreateDto = {
  menus: MenuCreateItemDto[];
};

export type ResponseMenuCreateDto = {
  menus: MenuCreateItemDto[];
};

export type RequestMenuImageDto = {
  image: File;
};

export type ResponseMenuImageDto = {
  imageKey: string;
  imageUrl: string;
};
