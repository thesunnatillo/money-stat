import { Module } from '@nestjs/common';
import { UserAuthModule } from './auth/user-auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserAuthModule,
    RouterModule.register([
      {
        path: '',
        children: [
          {
            path: 'auth',
            module: UserAuthModule,
          },
        ],
      },
    ]),
  ],
})
export class UsersModule {}
