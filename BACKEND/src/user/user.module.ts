import { EmailModule } from './../email/email.module';
import { AuthModule } from './../auth/auth.module';
import { FileService } from './../file/file.service';
import { User, UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
        EmailModule
    ],
    controllers: [UserController],

    providers: [UserService, FileService]
})

export class UserModule { } 