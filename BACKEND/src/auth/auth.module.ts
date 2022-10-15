import { EmailModule } from './../email/email.module';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { FileService } from 'src/file/file.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }, { name: User.name, schema: UserSchema }]),
        EmailModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "MySuperSecretString",
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, FileService],
    exports: [AuthService, JwtService],
})

export class AuthModule { }