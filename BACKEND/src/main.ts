import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require("cors");
  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  }

  app.use(cors(corsOptions))
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
