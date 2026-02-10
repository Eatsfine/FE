import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  // Axios 에러인 경우 (서버에서 준 response.data.message가 있으면 사용)
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  //ApiError 객체인 경우
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  // 일반 JS 에러인 경우
  if (error instanceof Error) {
    return error.message;
  }

  // 그 외
  return "알 수 없는 오류가 발생했습니다.";
};
