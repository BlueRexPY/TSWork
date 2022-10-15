import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "../jwt.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = request?.headers?.authorization?.split(" ")[1];
		if (!token) throw new UnauthorizedException({ message: "Invalid authorization token" });

		const isTokenValid = await this.jwtService.verifyJwt(token);
		if (!isTokenValid) throw new UnauthorizedException({ message: "Invalid authorization token" });

		return true;
	}
}