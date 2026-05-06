import type { AxiosProgressEvent } from "axios";

import type { ApiResponse } from "@/types/api";
import type {
  DeleteTableImageResult,
  PatchTableRequest,
  UpdatedTable,
  UploadTableImageResult,
} from "@/types/table";

import { api } from "../axios";

export const uploadTableImage = (
  storeId: number,
  tableId: number,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append("tableImage", file);

  return api.post<ApiResponse<UploadTableImageResult>>(
    `/api/v1/stores/${storeId}/tables/${tableId}/table-image`,
    formData,
    { onUploadProgress },
  );
};

export const deleteTableImage = (
  storeId: number,
  tableId: number,
): Promise<{ data: ApiResponse<DeleteTableImageResult> }> => {
  return api.delete(`/api/v1/stores/${storeId}/tables/${tableId}/table-image`);
};

export const patchTableInfo = (storeId: number, tableId: number, body: PatchTableRequest) =>
  api.patch<ApiResponse<{ updatedTables?: UpdatedTable[] }>>(
    `/api/v1/stores/${storeId}/tables/${tableId}`,
    body,
  );
