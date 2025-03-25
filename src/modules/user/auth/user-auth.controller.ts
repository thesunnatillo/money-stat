import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller()
@ApiTags('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    return await this.userAuthService.signup(data);
  }
}
