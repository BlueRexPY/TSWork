import { FileModule } from './../file/file.module';
import { AuthModule } from './../auth/auth.module';
import { EmailService } from './../email/email.service';
import { EmailModule } from './../email/email.module';
import { FileService } from './../file/file.service';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        FileModule
    ],
    controllers: [UserController],
    providers: [UserService, FileService, EmailService],
    exports: [UserService, FileService, EmailService],
})

export class UserModule { } 