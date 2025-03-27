import databaseConfig from '@app/config/database.config';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../data.source';

import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [databaseConfig],
    }),
  ],
  providers: [
    SeedService,
    {
      provide: DataSource,
      useFactory: async () => {
        const logger = new Logger(SeedModule.name);

        try {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          logger.log('Data source has been initialized');
        } catch (error) {
          logger.error('Error during Data Source initialization', error);
          process.exit();
        }
      },
    },
  ],
})
export class SeedModule {}
