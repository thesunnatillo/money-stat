import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/user/users.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { configScheme } from '@config/config.scheme';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['../.env'],
      validationSchema: configScheme,
    }),
    AdminModule,
    UsersModule,
  ],
})
export class AppModule {}
