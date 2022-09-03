import { User } from './../schemas/user.schema';
export class FinaleUser {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly user: User;
}