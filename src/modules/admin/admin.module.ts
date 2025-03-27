import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
