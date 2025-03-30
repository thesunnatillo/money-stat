import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { setResult } from '@app/shared/utils/helpers';

import { UserAuthService } from './user-auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { SignInReq, SignUpReq } from './interface/auth.interface';

@Controller()
@ApiTags('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const reqData: SignUpReq = {
      fullName: body.fullName,
      username: body.username,
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
  async signIn(
    @Body() body: SignInDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = req.headers.authorization.split(' ')[1];

    const reqData: SignInReq = {
      username: body.username,
      password: body.password,
      token,
    };

    const { data, errId } = await this.userAuthService.signIn(reqData);
    const response = setResult(errId, data);

    if (errId) {
      return res.status(HttpStatus.UNAUTHORIZED).jsonp(response);
    }

    return res.status(HttpStatus.OK).jsonp(response);
  }
}
