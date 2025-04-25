import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { configScheme } from '@config/config.scheme';
import { DataSource } from 'typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import jwtConfig from './config/jwt.config';
import { UsersModule } from './modules/user/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppDataSource } from './database/data.source';
import rateLimitConfig from './config/rate-limit.config';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, rateLimitConfig],
      envFilePath: ['../.env'],
      validationSchema: configScheme,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get('rateLimit.ttl'),
            limit: configService.get('rateLimit.limit'),
          },
        ],
      }),
    }),
    AdminModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: DataSource,
      useFactory: async () => {
        const logger = new Logger(AppModule.name);

        try {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          logger.log('Data source has been initialized');

          return AppDataSource;
        } catch (error) {
          logger.error('Error during Data Source initialization', error);
          process.exit();
        }
      },
    },
  ],
})
export class AppModule {}
