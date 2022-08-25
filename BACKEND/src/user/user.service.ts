import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from '../file/file.service';

const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService
) { }

    async create(dto: CreateUserDto,cv): Promise<User> {
        const cvPath = this.fileService.createFile(FileType.PDF, cv)
        const hashPassword = bcrypt.hashSync(dto.password, 5);
        const user = await this.userModel.create({...dto, password: hashPassword, cv:cvPath, roles: ["USER"] })
        return user
    }
    async getOneByName(userName: string): Promise<User> {
        const user = await this.userModel.findOne({ name: userName })
        return user
    }

    async getTryByName(serchEmail: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email: serchEmail })
        if (user) {
            return true
        } else {
            return false
        }
    }

    async getOneById(id: ObjectId): Promise<User> {
        const user = await this.userModel.findById(id)
        return user
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const user = await this.userModel.findByIdAndDelete(id)
        return user._id
    }

    async login(dto: LoginUserDto): Promise<User> {
        const user = await this.userModel.findOne({ email: dto.email })
        if (user) {
            const validPassword = bcrypt.compareSync(dto.password, user.password)
            if (validPassword) {
                return user
            }
        }
    }
}
