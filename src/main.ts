import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerDocs } from './swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const [adminDocument, userDocument] = createSwaggerDocs(app);

  SwaggerModule.setup('docs-user', app, userDocument);
  SwaggerModule.setup('docs-admin', app, adminDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
