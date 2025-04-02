import { Injectable } from '@nestjs/common';
import { BaseResponse } from '@app/shared/interfaces/interfaces';
import { UsersEntity } from '@app/database/entities/users.entity';
import { MyError } from '@app/shared/utils/errors';
import { isPasswordValid } from '@app/shared/utils/helpers';
import { TokenPayload } from '@app/modules/user/auth/interface/auth.interface';
import { JwtService } from '@app/modules/user/auth/jwt.service';
import { ServiceExceptions } from '@app/shared/exceptions/service.expection';

import { SignInRes, SingInReq } from './interface/signin.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(data: SingInReq): Promise<BaseResponse<SignInRes>> {
    try {
      const admin = await UsersEntity.findOne({
        where: { username: data.username },
      });

      if (!admin) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const validPassword = isPasswordValid(data.password, admin.password);

      if (!validPassword) {
        return { errId: MyError.LOGIN_OR_PASSWORD.errId, data: null };
      }

      const payload: TokenPayload = {
        id: admin.id,
        fullName: admin.fullName,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      };

      const [accessToken, refreshToken] = await this.jwtService.signTokens(
        payload,
        false,
      );

      return { errId: null, data: { accessToken, refreshToken } };
    } catch (e) {
      ServiceExceptions.handle(e, AuthService.name, 'signIn');
    }
  }
}
