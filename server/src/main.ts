import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.get('ALLOWED_ORIGINS').split(',') });
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
