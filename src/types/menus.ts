export type MenuCategory = "MAIN" | "SIDE" | "DRINK";

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
