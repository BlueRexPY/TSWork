import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.modules';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  const cors = require("cors");
  const corsOptions = {
    origin: "https://ts-work.vercel.app",// http://localhost:5000 https://ts-work.vercel.app
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions),cookieParser())
  await app.listen(process.env.PORT || 5000);
  console.log(`start server`)
}
bootstrap();
