import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.accessExpires'),
        },
      }),
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtService],
})
export class UserAuthModule {}
