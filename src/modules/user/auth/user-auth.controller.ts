import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';

@Controller()
@ApiTags('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signup')
  signup() {
    return this.userAuthService.signup();
  }
}
