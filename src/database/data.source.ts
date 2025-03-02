import dbConfig from "@config/database.config";
import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const configService = new ConfigService({ database: dbConfig() })

export const AppDataSource = new DataSource({
    type: configService.get("database.type"),
    url: configService.get("database.url"),
    keepConnectionAlive: true,
    logging: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false
} as DataSourceOptions)