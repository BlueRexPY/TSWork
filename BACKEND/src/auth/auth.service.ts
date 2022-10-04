import { LoginUserDto } from './../user/dto/login-user.dto';
import { tokensDbType } from './types/tokens-db';

import { Auth, AuthDocument } from './schemas/auth.schema';

import { CreateUserDto } from './../user/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokensType } from './types/tokens-user';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    ) { }


    generateTokens(payload: LoginUserDto): tokensType {
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' })
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
        return tokens
    }

    validateAccessToken(token: string): Promise<string> {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): Promise<string> {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
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

    removeToken(refreshToken: string) {
        const tokenData = this.authModel.deleteOne({ refreshToken: refreshToken })
        return tokenData;
    }

    findToken(refreshToken: string) {
        const tokenData = this.authModel.findOne({ refreshToken: refreshToken })
        return tokenData;
    }
}