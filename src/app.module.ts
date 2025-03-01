import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [AdminModule, UsersModule],
})
export class AppModule {}
