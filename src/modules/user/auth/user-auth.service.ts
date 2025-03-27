import { UsersEntity } from '@app/database/entities/users.entity';
import { ServiceExceptions } from '@app/shared/exceptions/service.expection';
import { Injectable } from '@nestjs/common';
import { hashPassword, isPasswordValid } from '@app/shared/utils/helpers';
import { MyError } from '@app/shared/utils/errors';
import { BaseResponse } from '@app/shared/interfaces/interfaces';

import { JwtService } from './jwt.service';
import {
  SignInReq,
  SignInRes,
  SignUpReq,
  SignUpRes,
  TokenPayload,
} from './interface/auth.interface';

@Injectable()
export class UserAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp(data: SignUpReq): Promise<BaseResponse<SignUpRes>> {
    try {
      const user = await UsersEntity.findOne({ where: { login: data.login } });

      if (user) {
        return { errId: MyError.LOGIN_ALREADY_USED.errId, data: null };
      }

      const hashedPassword = hashPassword(data.password);

      const savedUser = await UsersEntity.save({
        fullName: data.fullName,
        login: data.login,
        password: hashedPassword,
      });

      const payload: TokenPayload = {
        id: savedUser.id,
        fullName: savedUser.fullName,
        login: savedUser.login,
        role: savedUser.role,
      };

      const [accessToken, refreshToken] = await this.jwtService.signTokens(
        payload,
        false,
      );

      return { errId: null, data: { accessToken, refreshToken } };
    } catch (e) {
      return ServiceExceptions.handle(e, UserAuthService.name, 'signUp');
    }
  }

  async signIn(data: SignInReq): Promise<BaseResponse<SignInRes>> {
    try {
      const tokenPayload = await this.jwtService.verifyToken(data.token);

      if (!tokenPayload) {
        return { errId: MyError.INVALID_TOKEN.errId, data: null };
      }

      const user = await UsersEntity.findOne({
        where: { login: tokenPayload.login },
      });

      if (!user || user.login !== data.login) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const checkPassword = isPasswordValid(data.password, user.password);

      if (!checkPassword) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const payload: TokenPayload = {
        id: user.id,
        fullName: user.fullName,
        login: user.login,
        role: user.role,
      };

      const [accessToken, refreshToken] = await this.jwtService.signTokens(
        payload,
        false,
      );

      return { errId: null, data: { accessToken, refreshToken } };
    } catch (e) {
      return ServiceExceptions.handle(e, UserAuthService.name, 'signIn');
    }
  }
}
