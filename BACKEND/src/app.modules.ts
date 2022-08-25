import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
@Module({
    imports: [
        MongooseModule.forRoot(""),
        FileModule,
        UserModule,
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static'), }),
    ]
})

export class AppModule { }
