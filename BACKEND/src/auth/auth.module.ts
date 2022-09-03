import { AuthController } from './auth.controller';
import { Auth,AuthSchema } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule {}