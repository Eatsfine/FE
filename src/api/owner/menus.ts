// src/api/owner/menus.ts
import { api, OWNER_TOKEN } from "../axios"; // 프로젝트의 axios 인스턴스 경로에 맞춰 조정하세요
import type { ApiResponse } from "@/types/api";

export interface ServerMenu {
  menuId: number;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  imageUrl?: string | null;
  isSoldOut?: boolean;
  // 서버가 활성화 정보(isActive)를 주지 않으면 로컬에서 관리합니다.
}

interface GetMenusResult {
  menus: ServerMenu[];
}

interface UploadImageResult {
  imageKey: string;
  imageUrl: string;
}

export interface MenuUpdateItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageKey?: string; // 빈 문자열 보내면 이미지 삭제
}

interface MenuUpdateResult {
  menuId: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

interface MenuCreateItem {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageKey?: string;
}

interface MenuCreateResult {
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

export interface DeleteMenusRequest {
  menuIds: number[];
}

export interface DeleteMenusResponse {
  success: boolean;
  code: string;
  data: { deletedMenuIds: number[] };
  message: string;
}



/**
 * 가게의 메뉴 목록 조회
 * @param storeId string or number
 */
export async function getMenus(storeId: string | number) {
  const res = await api.get<ApiResponse<GetMenusResult>>(`/api/v1/stores/${storeId}/menus`);
  return res.data;
}

export async function createMenus(storeId: string | number, menus: MenuCreateItem[]) {
  const res = await api.post<ApiResponse<MenuCreateResult>>(
    `/api/v1/stores/${storeId}/menus`,
    { menus },{
        headers: {
            Authorization: `Bearer ${OWNER_TOKEN}`,
        }
    }
  );
  return res.data;
}

export async function uploadMenuImage(storeId: string | number, file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("accessToken");

  const res = await api.post<ApiResponse<{ imageKey: string; imageUrl: string }>>(
    `/api/v1/stores/${storeId}/menus/images`,
    formData,
    { headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
     } }
  );
  return res.data;
}

export const deleteMenuImage = async (
  storeId: string,
  menuId: string
): Promise<ApiResponse<{ deletedImageKey: string }>> => {
  try {
    const res = await api.delete<ApiResponse<{ deletedImageKey: string }>>(
        `/api/v1/stores/${storeId}/menus/${menuId}/image`,
        {
            headers: {
                Authorization: `Bearer ${OWNER_TOKEN}`,
            }
        }
    );
    return res.data;
  } catch (err: any) {
    console.error('deleteMenuImage error', err);
    return {
      isSuccess: false,
      code: '_MENU_IMAGE_DELETE_FAILED',
      message: err?.response?.data?.message || '이미지 삭제 실패',
      result: { deletedImageKey: '' },
    };
  }
};

export async function updateMenu(
  storeId: string | number,
  menuId: string | number,
  menu: MenuUpdateItem
) {
  const res = await api.patch<ApiResponse<MenuUpdateResult>>(
    `/api/v1/stores/${storeId}/menus/${menuId}`,
    menu,
    {
      headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
      },
    }
  );
  return res.data;
}

export const deleteMenus = async (storeId: string, menuIds: number[]): Promise<DeleteMenusResponse> => {
  const res = await api.delete(`/api/v1/stores/${storeId}/menus`, {
    headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
      },
    data: { menuIds },
  });

  return res.data;
};

// 품절 상태 변경
export async function updateMenuSoldOut(
  storeId: string | number,
  menuId: string | number,
  isSoldOut: boolean
) {
  const body = { isSoldOut };
  const res = await api.patch<ApiResponse<{ menuId: number; isSoldOut: boolean }>>(
    `/api/v1/stores/${storeId}/menus/${menuId}/sold-out`,
    body,
    {
      headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

