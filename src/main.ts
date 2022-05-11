import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appGlobalPrefix, apiVersion } from './app_constant/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(`${appGlobalPrefix}/${apiVersion}`);
  await app.listen(process.env.PORT || 6000);
}
bootstrap();
