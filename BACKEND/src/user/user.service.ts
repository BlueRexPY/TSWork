import { UpdateTrackDto } from './dto/update-track.dto';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const hashPassword = bcrypt.hashSync(dto.password, 5);
        const user = await this.userModel.create({ password: hashPassword, name: dto.name, tracks: [], roles: ["USER"] })
        return user
    }

    async getAll(count = 100, offset = 0): Promise<User[]> {
        const user = await this.userModel.find().skip(Number(offset)).limit(Number(count));
        return user
    }

    async getOneByName(userName: string): Promise<ObjectId[]> {
        const user = await this.userModel.findOne({ name: userName })
        return user.tracks
    }

    async getTryByName(userName: string): Promise<boolean> {
        const user = await this.userModel.findOne({ name: userName })
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

    async updateTrack(dto: UpdateTrackDto): Promise<ObjectId[]> {
        let user = await this.userModel.findOne({ "name": dto.userName })
        if (user.tracks.includes(dto.trackId)) {
            user = await this.userModel.findByIdAndUpdate(user.id, { "tracks": user.tracks.filter(i => i !== dto.trackId) })
        } else {
            user = await this.userModel.findByIdAndUpdate(user.id, { "tracks": [...user.tracks, dto.trackId] })
        }
        return user.tracks
    }

    async login(dto: CreateUserDto): Promise<User> {
        const user = await this.userModel.findOne({ name: dto.name })
        if (user) {
            const validPassword = bcrypt.compareSync(dto.password, user.password)
            if (validPassword) {
                return user
            }
        }
    }
}
