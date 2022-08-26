import { UpdateTrackDto } from './dto/update-track.dto';
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('/users')

export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.userService.getAll(count, offset)
    }

    @Get(":name")
    getOneByName(@Param("name") userName: string) {
        return this.userService.getOneByName(userName)
    }

    @Get("/try/:name")
    getTryByName(@Param("name") userName: string) {
        return this.userService.getTryByName(userName)
    }


    @Get("/id/:id")
    getOneById(@Param("id") userName: ObjectId) {
        return this.userService.getOneById(userName)
    }

    @Post("/login")
    login(@Body() dto: CreateUserDto) {
        return this.userService.login(dto)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.userService.delete(id)
    }

    @Post("/update")
    updateTrack(@Body() dto: UpdateTrackDto) {
        return this.userService.updateTrack(dto)
    }
}

