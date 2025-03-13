import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/admin/auth/auth.module';
import { UserAuthModule } from './modules/user/auth/user-auth.module';
import { CostsModule } from './modules/user/costs/costs.module';

export function createSwaggerDocs(app: INestApplication): OpenAPIObject[] {
  // Admin
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin Api Docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AuthModule],
  });

  // Users
  const userConfig = new DocumentBuilder()
    .setTitle('User Api Docs')
    .setDescription('Api description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UserAuthModule, CostsModule],
  });

  return [adminDocument, userDocument];
}
