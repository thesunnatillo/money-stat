export interface ISignUp {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  id: number;
  fullName: string;
  login: string;
  role: string;
}
