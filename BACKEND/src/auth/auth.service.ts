import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginUserDto } from './../user/dto/login-user.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from './jwt.service';
import { FinalUser } from 'src/user/dto/final-user';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { FileService, FileType } from 'src/file/file.service';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid'

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Auth.name) private authModel: Model<AuthDocument>, private jwtService: JwtService, private fileService: FileService, private emailService: EmailService) { }

    async refresh(refresh: string): Promise<FinalUser> {
        if (!refresh) throw new BadRequestException({ message: "Invalid refresh token: no token" });
        const refreshToken = (refresh.split(" ")[1])
        const session = await this.authModel.findOne({ refreshToken })
        if (!session) throw new BadRequestException({ message: "Invalid refresh token: no session" });

        const validTokenData = await this.jwtService.verifyJwt(refreshToken);
        if (!validTokenData) throw new BadRequestException({ message: "Invalid refresh token: invalid token" });

        const user = await this.userModel.findOne({ email: validTokenData.email })

        const newPairOfTokens = await this.jwtService.generateJwtPair({ email: user.email, password: user.password });

        await this.saveToken(user.email, refreshToken)

        return { accessToken: newPairOfTokens.accessToken, refreshToken: newPairOfTokens.refreshToken, user: user }
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

    async findToken(refreshToken: string) {
        const tokenData = await this.authModel.findOne({ refreshToken: refreshToken })
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
        const user = await this.userModel.findOne({ email: dto.email })
        const validPassword = await bcrypt.compare(dto.password, user.password);
        if (validPassword) {
            const tokens = await this.jwtService.generateJwtPair(dto);
            await this.saveToken(dto.email, tokens.refreshToken);
            return { ...tokens, user: user }
        }
        throw new Error("Invalid password")
    }

    async registration(dto: CreateUserDto, cv): Promise<FinalUser> {
        const checkUSer = await this.userModel.findOne({ email: dto.email })
        if (checkUSer) {
            throw new Error("a user with this email has already been created")
        }
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        const hashPassword = bcrypt.hashSync(dto.password, 5);
        const activationLink = uuid.v4()

        await this.emailService.sendActiveMail(dto.email, activationLink);

        const user = await this.userModel.create({ ...dto, password: hashPassword, cv: cvPath, roles: ["USER"], active: false, activationLink: activationLink })

        const tokens = await this.jwtService.generateJwtPair(dto);
        await this.saveToken(dto.email, tokens.refreshToken);

        return { user: user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
    }
}