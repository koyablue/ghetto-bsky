import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { agent } from './lib/at-proto/init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.APP_PASSWORD);

  // TODO: This is temporary solution
  await agent.login({
    identifier: 'yohjo.bsky.social',
    password: process.env.APP_PASSWORD || '',
  });

  await app.listen(4000);
}
bootstrap();
