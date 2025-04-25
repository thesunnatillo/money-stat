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
  ValidateTokenReq,
} from './interface/auth.interface';

@Injectable()
export class UserAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp(data: SignUpReq): Promise<BaseResponse<SignUpRes>> {
    try {
      const user = await UsersEntity.findOne({
        where: { username: data.username },
      });

      if (user) {
        return { errId: MyError.LOGIN_ALREADY_USED.errId, data: null };
      }

      const hash = hashPassword(data.password);

      const savedUser = await UsersEntity.save({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: hash,
      });

      const payload: TokenPayload = {
        id: savedUser.id,
        fullName: savedUser.fullName,
        username: savedUser.username,
        email: savedUser.email ?? 'null',
        role: savedUser.role,
        status: savedUser.status,
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
      const user = await UsersEntity.findOne({
        where: { username: data.username },
      });

      if (!user || user.username !== data.username) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const checkPassword = isPasswordValid(data.password, user.password);

      if (!checkPassword) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const payload: TokenPayload = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email ?? 'null',
        role: user.role,
        status: user.status,
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

  async validateToken(
    data: ValidateTokenReq,
  ): Promise<BaseResponse<TokenPayload>> {
    try {
      const tokenPayload = await this.jwtService.verifyToken(data.token);

      // Check user exists
      await UsersEntity.findOneByOrFail({
        id: tokenPayload.id,
      });

      return { errId: null, data: tokenPayload };
    } catch (e) {
      return ServiceExceptions.handle(e, UserAuthService.name, 'validateToken');
    }
  }
}
