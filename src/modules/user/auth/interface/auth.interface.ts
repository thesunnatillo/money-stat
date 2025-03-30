export interface SignUpReq {
  fullName: string;
  username: string;
  password: string;
}

export interface SignUpRes {
  accessToken: string;
  refreshToken: string;
}

export interface SignInReq {
  username: string;
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
  username: string;
  email: string;
  role: string;
}
