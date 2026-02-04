  export interface ApiResponse<T> {
    success: boolean;
    code: string;
    data: T;
    message: string;
  }

  export interface ApiError {
    status: number;
    code?: string;
    message: string;
  }
