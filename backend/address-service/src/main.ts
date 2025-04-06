/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import * as fs from 'fs';

async function bootstrap() {
  // Létrehozzuk a logs mappát, ha még nem létezik
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  const app = await NestFactory.create(AppModule);
  
  // Globális logger beállítása
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  
  // Validáció beállítása
  app.useGlobalPipes(new ValidationPipe());
  
  // CORS beállítása
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();