export interface BaseResponse<T> {
  errId?: number;
  data: T;
  total?: number;
}

export interface SuccessRes {
  success: boolean;
}
