import type {
  RequestStoreCreateDto,
  ResponseStoreCreateDto,
} from "@/types/store";
import { api } from "./axios";
import type { ApiResponse } from "@/types/api";

export const postRegisterStore = async (
  body: RequestStoreCreateDto,
): Promise<ResponseStoreCreateDto> => {
  const { data } = await api.post<ApiResponse<ResponseStoreCreateDto>>(
    "/api/v1/stores",
    body,
  );
  return data.result;
};
