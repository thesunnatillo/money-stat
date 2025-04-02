export interface SingInReq {
  username: string;
  password: string;
}

export interface SignInRes {
  accessToken: string;
  refreshToken: string;
}
