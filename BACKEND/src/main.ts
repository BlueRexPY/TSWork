import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.modules';
import * as cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require("cors");
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cookieParser())
  app.use(cors(corsOptions))
  await app.listen(process.env.PORT || 5000);
  console.log(`start server`)
}
bootstrap();