import { MaxLength } from '@app/validator/max-length.validator';
import { MinLength } from '@app/validator/min-length.validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  @MinLength(5)
  @MaxLength(32)
  username: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
