import { EmailService } from './../email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleUserDto } from './dto/addRole-user.dto';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from '../file/file.service';
import * as uuid from 'uuid'

const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) 
        private emailService: EmailService,
        private fileService: FileService,
        private userModel: Model<UserDocument>,
    ) { }

    async create(dto: CreateUserDto, cv): Promise<UserDocument> {
        const checkUSer = await this.userModel.findOne({ email: dto.email })
        if (checkUSer) {
            throw new Error("a user with this email has already been created")
        }
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        const hashPassword = bcrypt.hashSync(dto.password, 5);
        const activetionLink = uuid.v4()

        await this.emailService.sendActiveMail(dto.email, activetionLink);

        const user = await this.userModel.create({ ...dto, password: hashPassword, cv: cvPath, roles: ["USER"], active: false, activetionLink: activetionLink })
        return user;
    }

    async updateCV(dto: UpdateUserDto, cv): Promise<User> {
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        await this.userModel.findOneAndUpdate({ email: dto.email }, { number: dto.number, name: dto.name, github: dto.github, surname: dto.surname, cv: cvPath })
        const user = this.userModel.findOne({ email: dto.email })
        return user
    }

    async update(dto: UpdateUserDto): Promise<User> {
        await this.userModel.findOneAndUpdate({ email: dto.email }, { number: dto.number, name: dto.name, github: dto.github, surname: dto.surname })
        const user = this.userModel.findOne({ email: dto.email })
        return user
    }

    async active(email: string, activetionLink: string): Promise<boolean> {
        if (await this.userModel.findOne({ email: email, activetionLin: activetionLink })) {
            await this.userModel.findOneAndUpdate({ email: email }, { active: true })
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

        if (![...user.roles].includes(dto.role)) {
            await this.userModel.findByIdAndUpdate(dto.id, { roles: [...user.roles, dto.role] });
            return true
        }
        return false
    }

    async response(email: string, id: string): Promise<boolean> {
        let user = await this.userModel.findOne({ email: email });
        if ([...user.responses].includes(id)) {
            return false
        }
        await this.userModel.findOneAndUpdate({ email: email }, { responses: [...user.responses, id] });
        return true
    }

    async delete(id: string): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id)
        return user._id
    }


}
