import { Bind, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from './track.service';
import { CreateTreackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('/tracks')

export class TrackController {

    constructor(private trackService: TrackService) {}

    @Post()
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files , @Body() dto: CreateTreackDto) {
        return this.trackService.create(dto, files.picture[0], files.audio[0])
    }


    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @Get('/search/name')
    searchName(@Query('query') query: string) {
        return this.trackService.searchName(query)
    }

    @Get('/search/artist')
    searchArtist(@Query('query') query: string) {
        return this.trackService.searchArtist(query)
    }

    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id)
    }
    
    @Get("/gettop/:count")
    getTop(@Param("count")count: number) {
        return this.trackService.getTop(count)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }
}