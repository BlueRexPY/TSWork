import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { Bind, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from 'mongoose';
import { CreateAlbumDto } from "./dto/create-album.dto";

@Controller('/albums')

export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Post()
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto, files.picture[0],)
    }

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset)
    }

    @Get(":name")
    getOneByName(@Param("name") albumName: string) {
        return this.albumService.getOneByName(albumName)
    }

    @Get("/id/:id")
    getOneById(@Param("id") id: ObjectId) {
        return this.albumService.getOneById(id)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.albumService.delete(id)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.albumService.listen(id);
    }

    @Get('/search/name')
    searchName(@Query('query') query: string) {
        return this.albumService.searchName(query)
    }

}