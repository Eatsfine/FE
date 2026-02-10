import { useMutation } from "@tanstack/react-query";
import { postRegisterStore } from "@/api/store";
import type { RequestStoreCreateDto } from "@/types/store";

// 식당 등록 훅
export const useRegisterStore = () => {
  return useMutation({
    mutationFn: (body: RequestStoreCreateDto) => postRegisterStore(body),
    onError: (error) => {
      console.error("가게 등록 실패:", error);
    },
  });
};