
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from './jwt.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService,JwtService],
    exports: [AuthService,JwtService],
})

export class AuthModule { }