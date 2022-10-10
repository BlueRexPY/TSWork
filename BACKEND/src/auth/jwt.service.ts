import { tokensType } from './types/tokens-user';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { Injectable } from "@nestjs/common";
import { JwtService as NestJwt } from "@nestjs/jwt";

@Injectable()
export class JwtService {
	constructor(private jwtService: NestJwt) { }

	private getJwtSecret(): string {
		return process.env.JWT_SECRET || "MySuperSecretString";
	}

	async generateJwtPair(user: LoginUserDto): Promise<tokensType> {
		const accessToken = this.jwtService.sign(user, { expiresIn: "1h" });
		const refreshToken = this.jwtService.sign(user, { expiresIn: "30d" });
		return {
			accessToken,
			refreshToken,
		};
	}

	async verifyJwt(jwt: string): Promise<LoginUserDto | null> {
		const secret = this.getJwtSecret();
		return await this.jwtService.verifyAsync(jwt, { secret }).catch(() => null);
	}
}
