import { UsersEntity } from '@app/database/entities/users.entity';
import { ServiceExceptions } from '@app/shared/exceptions/service.expection';
import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { hashPassword } from '@app/shared/utils/helpers';
import { ISignUp, TokenPayload } from './interfaces';
import { JwtService } from './jwt.service';

@Injectable()
export class UserAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signup(data: SignUpDto): Promise<ISignUp> {
    try {
      const user = await UsersEntity.findOne({ where: { login: data.login } });

      if (user) {
        throw new MethodNotAllowedException();
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

      return { accessToken, refreshToken };
    } catch (e) {
      ServiceExceptions.handle(e, UserAuthService.name, 'signup');
    }
  }
}
