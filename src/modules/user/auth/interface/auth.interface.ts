export interface SignUpReq {
  fullName: string;
  login: string;
  password: string;
}

export interface SignUpRes {
  accessToken: string;
  refreshToken: string;
}

export interface SignInReq {
  login: string;
  password: string;
  token: string;
}

export interface SignInRes {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: number;
  fullName: string;
  login: string;
  role: string;
}
