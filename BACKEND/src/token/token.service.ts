import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {

    generateTokens(payload: string): object {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }

}