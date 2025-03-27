import { MaxLength } from '@app/validator/max-length.validator';
import { MinLength } from '@app/validator/min-length.validator';

export class SignUpDto {
  @MinLength(10)
  @MaxLength(55)
  fullName: string;

  @MinLength(5)
  @MaxLength(32)
  login: string;

  @MinLength(8)
  @MaxLength(24)
  password: string;
}

export class SignInDto {
  @MinLength(5)
  @MaxLength(32)
  login: string;

  @MinLength(8)
  @MaxLength(24)
  password: string;
}
