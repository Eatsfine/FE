  export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    result: T;
    message: string;
  }

  export interface ApiError {
    status: number;
    code?: string;
    message: string;
  }
