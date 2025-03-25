import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/user/users.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import jwtConfig from './config/jwt.config';
import { configScheme } from '@config/config.scheme';
import { DataSource } from 'typeorm';
import { AppDataSource } from './database/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['../.env'],
      validationSchema: configScheme,
    }),
    AdminModule,
    UsersModule,
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          console.log('Data source has been initialized');

          return AppDataSource;
        } catch (error) {
          console.error('Error during Data Source initialization', error);
          process.exit();
        }
      },
    },
  ],
})
export class AppModule {}
