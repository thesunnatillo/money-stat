import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateCostDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  amount: number;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  desc: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  paymentType: number;
}
