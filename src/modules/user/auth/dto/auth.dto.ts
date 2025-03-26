export class SignUpDto {
  fullName: string;
  login: string;
  password: string;
}

export class SignInDto {
  login: string;
  password: string;
  token: string;
}
