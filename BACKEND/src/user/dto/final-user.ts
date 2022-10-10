import { User } from './../schemas/user.schema';
export class FinalUser {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly user: User;
}