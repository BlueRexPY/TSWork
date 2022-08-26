import { Injectable, UseInterceptors } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTreackDto } from './dto/create-track.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService
    ) { }

    async create(dto: CreateTreackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({ ...dto, listens: 0, picture: picturePath, audio: audioPath })
        return track
    }

    async getAll(count = 100, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id)
        return track
    }

    async getTop(count = 1): Promise<Track[]> {
        const track = await this.trackModel.find().sort({ listens: -1 }).limit(count)
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1
        track.save()
    }

    async searchName(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return tracks;
    }

    async searchArtist(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            artist: { $regex: new RegExp(query, 'i') }
        })
        return tracks;
    }
}
