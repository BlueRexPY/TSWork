import { LoginUserDto } from './dto/login-user.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/users')

export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cv', maxCount: 1 }
    ]))
    create(@UploadedFiles() files , @Body() dto: CreateUserDto){
        return this.userService.create(dto, files.cv[0])
    } 

    @Get(":name")
    getOneByName(@Param("name") userName: string) {
        return this.userService.getOneByName(userName)
    }

    @Get("/try/:email")
    getTryByName(@Param("email") serchEmail: string) {
        return this.userService.getTryByName(serchEmail)
    }

    @Get("/id/:id")
    getOneById(@Param("id") userName: ObjectId) {
        return this.userService.getOneById(userName)
    }

    @Post("/login")
    login(@Body() dto: LoginUserDto) {
        return this.userService.login(dto)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.userService.delete(id)
    }
}