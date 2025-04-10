import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import dbConfig from '../config/database.config';

const configService = new ConfigService({ database: dbConfig() });

export const AppDataSource = new DataSource({
  type: configService.get('database.type'),
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.user'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  schema: 'public2',
  keepConnectionAlive: true,
  logging: false,
  migrations: [__dirname + '/migrations/**'],
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions);
