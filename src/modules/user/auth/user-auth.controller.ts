import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { setResult } from '@app/shared/utils/helpers';

import { UserAuthService } from './user-auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { SignInReq, SignUpReq } from './interface/auth.interface';
import { Public } from '@app/decorator/public.decorator';

@Controller()
@ApiTags('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signup')
  @Public()
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const reqData: SignUpReq = {
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const { data, errId } = await this.userAuthService.signUp(reqData);
    const response = setResult(errId, data);

    if (errId) {
      return res.status(HttpStatus.BAD_REQUEST).jsonp(response);
    }

    return res.status(HttpStatus.OK).jsonp(response);
  }

  @Post('signin')
  @Public()
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const reqData: SignInReq = {
      username: body.username,
      password: body.password,
    };

    const { data, errId } = await this.userAuthService.signIn(reqData);
    const response = setResult(errId, data);

    if (errId) {
      return res.status(HttpStatus.UNAUTHORIZED).jsonp(response);
    }

    return res.status(HttpStatus.OK).jsonp(response);
  }
}
