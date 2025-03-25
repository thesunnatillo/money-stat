export interface BaseResponse<T> {
  errId?: number;
  data: T;
  total?: number;
}
