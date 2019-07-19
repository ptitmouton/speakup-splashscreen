if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch {
    // could not fetch .env
    console.error('Could not fetch .env');
  }
}

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { join } from 'path';
import * as hbs from 'hbs';

import '../views/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
