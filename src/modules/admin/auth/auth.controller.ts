import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { setResult } from '@app/shared/utils/helpers';

import { AuthService } from './auth.service';
import { SingInReq } from './interface/signin.interface';
import { SignInDto } from './dto/signin.dto';
import { Public } from '@app/decorator/public.decorator';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const reqData: SingInReq = {
      username: body.username,
      password: body.password,
    };

    const { errId, data } = await this.authService.signIn(reqData);
    const response = setResult(errId, data);

    if (errId) {
      return res.status(HttpStatus.UNAUTHORIZED).jsonp(response);
    }

    return res.status(HttpStatus.OK).jsonp(response);
  }
}
