import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import { createSwaggerDocs } from './swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet())

  const [adminDocument, userDocument] = createSwaggerDocs(app);

  SwaggerModule.setup('docs-user', app, userDocument);
  SwaggerModule.setup('docs-admin', app, adminDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
