
import { EmailService } from './../email/email.service';
import { AuthService } from './../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleUserDto } from './dto/addRole-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { forwardRef, Inject, Injectable, Redirect } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from '../file/file.service';

import * as uuid from 'uuid'
import { FinaleUser } from './dto/final-user';

const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
    private authService: AuthService,
    private emailService: EmailService
) { }

    async create(dto: CreateUserDto, cv): Promise<FinaleUser> {
        const checkUSer = await this.userModel.findOne({email: dto.email})
        if(checkUSer){
            throw new Error("a user with this email has already been created")
        }
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        const hashPassword = bcrypt.hashSync(dto.password, 5);
        const activetionLink = uuid.v4()

        const tokens = await this.authService.generateTokens({...dto});
        await this.authService.saveToken(dto.email, tokens.refreshToken);
    
        await this.emailService.sendActiveMail(dto.email, activetionLink);

        const user = await this.userModel.create({...dto, password: hashPassword, cv:cvPath, roles: ["USER"], active:false, activetionLink: activetionLink })
        return {...tokens, user:user}
    }
    
    async update(dto: UpdateUserDto,cv): Promise<User> {
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        const user = await this.userModel.findOneAndUpdate({email:dto.email},{name:dto.name, github:dto.github, surename:dto.surename ,cv:cvPath})
        return user
    }

    async active(email:string, activetionLink:string): Promise<boolean> {

        if(await this.userModel.findOne({email: email,activetionLin:activetionLink})){
            await this.userModel.findOneAndUpdate({email:email},{active:true})           
            return true
        }
        return false
    }

    async getOneByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email })
        return user
    }

    async getTryByEmail(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email: email })
        if (user) {
            return true
        } else {
            return false
        }
    }

    async getOneById(id: string): Promise<User> {
        const user = await this.userModel.findById(id)
        return user
    }

    async addRole(dto: AddRoleUserDto): Promise<boolean> {
        let user = await this.userModel.findById(dto.id);

        if(![...user.roles].includes(dto.role)){
            await this.userModel.findByIdAndUpdate(dto.id,  {roles:[...user.roles, dto.role]});
            return true
        }
        return false
    }

    async response(email: string, id:string): Promise<boolean> {
        
        let user = await this.userModel.findOne({email:email});
        console.log(user)
        if([...user.responses].includes(id)){
            return false
        }
        await this.userModel.findOneAndUpdate({email:email},  {responses:[...user.responses, id]});
        return true
    }

    async delete(id: string): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id)
        return user._id
    }

    async logout(refresh: string): Promise<boolean> {
        const tokenData = await this.authService.removeToken(refresh);
        if(tokenData){
            return true
        }
        return false
    }


    async login(dto:LoginUserDto): Promise<FinaleUser>{
        const user = await this.userModel.findOne({email: dto.email})
        const validPassword = await bcrypt.compare(dto.password, user.password);
        if(validPassword){
            const tokens = await this.authService.generateTokens({...dto});
            await this.authService.saveToken(dto.email, tokens.refreshToken);
            return {...tokens, user:user}
        }
        throw new Error("Invalid password")
    }
}
