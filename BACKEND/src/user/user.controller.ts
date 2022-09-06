import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleUserDto } from './dto/addRole-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, Query, Redirect, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
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

    @Post("update")
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cv', maxCount: 1 }
    ]))
    update(@UploadedFiles() files , @Body() dto: UpdateUserDto){
        return this.userService.update(dto, files.cv[0])
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
    getOneById(@Param("id") userName: ObjectId) {
        return this.userService.getOneById(userName)
    }

    @Post("/login")
    login(@Body() dto: LoginUserDto,@Res() res: Response){
        return this.userService.login(dto)
    }
    @Post("/logout")
    logout(@Body() dto: {refresh:string}) {
        return this.userService.logout(dto.refresh)
    }

    @Post("/addRole/")
    addRole(@Body() dto: AddRoleUserDto) {
        return this.userService.addRole(dto)
    }

    @Get("/active/:email/:activetionLink")
    @Redirect('http://localhost:3000',302)
    active(@Param("email") email: string, @Param("activetionLink") activetionLink: string) {
        return this.userService.active(email,activetionLink) 
    }
    
    
    @Post("/response/")
    response(@Body() email: string, id:ObjectId) {
        return this.userService.response(email,id)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.userService.delete(id)
    }
}