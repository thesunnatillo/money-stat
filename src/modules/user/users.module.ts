import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UserAuthModule } from './auth/user-auth.module';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    UserAuthModule,
    CostsModule,
    RouterModule.register([
      {
        path: '',
        children: [
          {
            path: 'auth',
            module: UserAuthModule,
          },
          {
            path: 'costs',
            module: CostsModule,
          },
        ],
      },
    ]),
  ],
})
export class UsersModule {}
