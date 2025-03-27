import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

const run = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.get(SeedService).run();
  await app.close();
};

void run();
