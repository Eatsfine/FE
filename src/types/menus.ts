export interface MenuItem {
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
}

export interface SelectedMenu {
  menuId: string;
  quantity: number;
}

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

export interface MenuCreateItemDto {
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  imageKey?: string;
}

export interface RequestMenuCreateDto {
  menus: MenuCreateItemDto[];
}

export interface ResponseMenuCreateDto {
  menus: MenuCreateItemDto[];
}

export interface RequestMenuImageDto {
  image: File;
}

export interface ResponseMenuImageDto {
  imageKey: string;
  imageUrl: string;
}

export interface ServerMenu {
  menuId: number;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  imageUrl?: string | null;
  isSoldOut?: boolean;
}

export interface GetMenusResult {
  menus: ServerMenu[];
}

export interface MenuUpdateItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageKey?: string;
}

export interface MenuUpdateResult {
  menuId: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

export interface MenuCreateItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageKey?: string;
}

export interface MenuCreateResult {
  menus: {
    menuId: number;
    name: string;
    description?: string;
    price: number;
    category?: string;
    imageUrl?: string;
    imageKey?: string;
  }[];
}

export interface DeleteMenusResponse {
  isSuccess: boolean;
  code: string;
  result: { deletedMenuIds: number[] };
  message: string;
}

export interface MenuDto {
  menuId: number;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory | string;
  imageUrl?: string;
  isSoldOut: boolean;
}

export interface MenuListResult {
  menus: MenuDto[];
}
