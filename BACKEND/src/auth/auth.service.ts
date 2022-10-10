import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from './../user/user.service';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokensType } from './types/tokens-user';
import { JwtService } from './jwt.service';
import { FinalUser } from 'src/user/dto/final-user';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>, private jwtService: JwtService, private userService: UserService
    ) { }

    async refresh(refreshToken: string): Promise<tokensType> {
        console.log("Refreshing")
        if (!refreshToken) throw new BadRequestException({ message: "Invalid refresh token: no token" });

        const session = await this.authModel.findOne({ refreshToken })
        if (!session) throw new BadRequestException({ message: "Invalid refresh token: no session" });

        const validTokenData = await this.jwtService.verifyJwt(refreshToken);
        if (!validTokenData) throw new BadRequestException({ message: "Invalid refresh token: invalid token" });

        const user = await this.userService.getOneByEmail(validTokenData.email)

        const newPairOfTokens = await this.jwtService.generateJwtPair({ email: user.email, password: user.password });

        await this.saveToken(user.email, refreshToken)

        return newPairOfTokens
    }

    async saveToken(email: string, refreshToken: string): Promise<object> {
        const tokenData = await this.authModel.findOne({ user: email })

        if (tokenData) {
            const token = await this.authModel.findOneAndUpdate({ user: email }, { refreshToken: refreshToken });
            return token;
        }
        const token = await this.authModel.create({ user: email, refreshToken })

        return token;
    }

    findToken(refreshToken: string) {
        const tokenData = this.authModel.findOne({ refreshToken: refreshToken })
        return tokenData;
    }

    async logout(refresh: string): Promise<boolean> {
        const tokenData = this.authModel.deleteOne({ refreshToken: refresh })
        if (tokenData) {
            return true
        }
        return false
    }

    async login(dto: LoginUserDto): Promise<FinalUser> {
        const user = await this.userService.getOneByEmail(dto.email)
        const validPassword = await bcrypt.compare(dto.password, user.password);
        if (validPassword) {
            const tokens = await this.jwtService.generateJwtPair(dto);
            await this.saveToken(dto.email, tokens.refreshToken);
            return { ...tokens, user: user }
        }
        throw new Error("Invalid password")
    }

    async registration(dto: CreateUserDto, cv): Promise<FinalUser> {
        const user = await this.userService.create(dto, cv)
        const tokens = await this.jwtService.generateJwtPair(dto);
        await this.saveToken(dto.email, tokens.refreshToken);

        return { user: user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
    }
}