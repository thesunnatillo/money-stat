import { ConfigService } from '@nestjs/config';
import { JwtService as Jwt } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenPayload } from './interface/auth.interface';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwt: Jwt,
    private readonly configService: ConfigService,
  ) {}

  async signTokens(
    payload: TokenPayload,
    isRefresh: boolean,
  ): Promise<[string, string?]> {
    const accessToken = await this.jwt.signAsync(payload);

    if (isRefresh) {
      return [accessToken];
    }

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('jwt.refreshExpires'),
    });

    return [accessToken, refreshToken];
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    return await this.jwt.verifyAsync(token);
  }
}
