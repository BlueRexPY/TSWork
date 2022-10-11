import { EmailModule } from './../email/email.module';
import { FileService } from './../file/file.service';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        EmailModule,
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService, FileService],
    exports: [UserService]
})

export class UserModule { } 