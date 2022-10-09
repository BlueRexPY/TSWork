import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleUserDto } from './dto/addRole-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, Query, Redirect, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
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
    create(@UploadedFiles() files, @Body() dto: CreateUserDto) {
        return this.userService.create(dto, files.cv[0])
    }

    @Post("update")
    update(@Body() dto: UpdateUserDto) {
        console.log(dto)
        return this.userService.update(dto)
    }

    @Post("updateCV")
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cv', maxCount: 1 }
    ]))
    updateCV(@UploadedFiles() files, @Body() dto: UpdateUserDto) {
        return this.userService.updateCV(dto, files.cv[0])
    }

    @Get(":email")
    getOneByName(@Param("email") email: string) {
        return this.userService.getOneByEmail(email)
    }

    @Get("/try/:email")
    getTryByName(@Param("email") serchEmail: string) {
        return this.userService.getTryByEmail(serchEmail)
    }

    @Get("/id/:id")
    getOneById(@Param("id") userName: string) {
        return this.userService.getOneById(userName)
    }

    @Post("/login")
    login(@Body() dto: LoginUserDto) {
        return this.userService.login(dto)
    }

    @Post("/logout")
    logout(@Body() dto: { refresh: string }) {
        return this.userService.logout(dto.refresh)
    }

    @Post("/addRole/")
    addRole(@Body() dto: AddRoleUserDto) {
        return this.userService.addRole(dto)
    }

    @Get("/active/:email/:activetionLink")
    @Redirect('https://ts-work.vercel.app/auth/login', 302)
    active(@Param("email") email: string, @Param("activetionLink") activetionLink: string) {
        return this.userService.active(email, activetionLink)
    }

    @Post("/response/")
    response(@Body() data: { email: string, id: string }) {
        return this.userService.response(data.email, data.id)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id)
    }
}