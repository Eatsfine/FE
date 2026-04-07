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

export const MenuCategoryLabel: Record<UiCategory, string> = {
  MAIN: "메인 메뉴",
  SIDE: "사이드 메뉴",
  BEVERAGE: "음료",
  OTHER: "기타",
  ALCOHOL: "주류",
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

export type MenuResponseItem = {
  menuId?: number | string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  imageKey?: string;
  isSoldOut?: boolean;
  isActive?: boolean;
};
