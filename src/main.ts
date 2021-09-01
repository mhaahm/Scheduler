import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SchedulerLoger from './Services/SchedulerLoger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new SchedulerLoger(),
  });
  app.enableCors();
  app.setGlobalPrefix('api'); // New

  await app.listen(3000);
}

bootstrap();
