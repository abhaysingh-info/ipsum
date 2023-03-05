import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin:
      'https://abhaysingh-info-didactic-waffle-jgq9rp9r96gcj7wr-4200.preview.app.github.dev',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

process.on('uncaughtException', (error) => {
  console.log(error);
});
