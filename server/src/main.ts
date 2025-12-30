import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://www.sistem-toserba.shop',
    'https://sistem-toserba.shop',
  ],
  credentials: true,
});

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
