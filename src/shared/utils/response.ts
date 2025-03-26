export interface ErrorObject {
  errId: number;
  isFriendly: boolean;
  errMsg: string;
}

export interface HttpResponse {
  data: any;
  error: ErrorObject;
  success: boolean;
}
