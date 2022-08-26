import { Injectable, UseInterceptors } from '@nestjs/common';
import { Album, AlbumDocument } from './schemas/album.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        private fileService: FileService
    ) { }

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const albume = await this.albumModel.create({ tracks: dto.tracks.split(" "), name: dto.name, author: dto.author, listens: 0, picture: picturePath })
        return albume
    }

    async getAll(count = 100, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(Number(offset)).limit(Number(count));
        return albums;
    }

    async getOneById(id: ObjectId): Promise<{ listens: number, author: string, tracks: string[], name: string, picture: string }> {
        const albume = await this.albumModel.findById(id)
        return { tracks: albume.tracks, listens: albume.listens, author: albume.author, name: albume.name, picture: albume.picture }
    }

    async getOneByName(albumeName: string): Promise<{ listens: number, author: string, tracks: string[], name: string, picture: string }> {
        const albume = await this.albumModel.findOne({ name: albumeName })
        return { tracks: albume.tracks, listens: albume.listens, author: albume.author, name: albume.name, picture: albume.picture }
    }

    async getTop(count = 5): Promise<Album[]> {
        const albume = await this.albumModel.find().sort({ listens: -1 }).limit(count)
        return albume
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const albume = await this.albumModel.findByIdAndDelete(id)
        return albume._id
    }

    async listen(id: ObjectId) {
        const albume = await this.albumModel.findById(id);
        albume.listens += 1
        albume.save()
    }

    async searchName(query: string): Promise<Album[]> {
        const albums = await this.albumModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return albums;
    }

}
