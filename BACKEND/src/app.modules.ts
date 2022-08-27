import { EmailModule } from './email/email.module';
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { VacancyModule } from "./vacancy/vacancy.module";
import { TokenModule } from "./token/token.module";
@Module({
    imports: [
        MongooseModule.forRoot("", {
            useCreateIndex: true,
            autoIndex: true,
          }),
        FileModule,
        UserModule,
        VacancyModule,
        TokenModule,
        EmailModule,
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
    ]
})

export class AppModule { }
