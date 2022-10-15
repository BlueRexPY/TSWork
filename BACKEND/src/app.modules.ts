
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { VacancyModule } from "./vacancy/vacancy.module";
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL),
        VacancyModule,
        FileModule,
        EmailModule,
        AuthModule,
        UserModule,
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
    ],
    controllers: [],
    providers: [],
})

export class AppModule { }
