import * as fs from 'fs';
import * as path from 'path';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { createSwaggerDocs } from './swagger';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.enableCors();

  const logsStream = fs.createWriteStream(path.join(__dirname, '../logs.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: logsStream }));

  const [adminDocument, userDocument] = createSwaggerDocs(app);

  SwaggerModule.setup('docs-user', app, userDocument);
  SwaggerModule.setup('docs-admin', app, adminDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    logger.log(`Money Stat started at port 3000`);
  })
  .catch((e) => {
    logger.error(`Catch exception in bootstrap app: ${e}`);
  });
