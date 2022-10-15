import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleUserDto } from './dto/addRole-user.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, Query, Redirect, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Post("update")
    update(@Body() dto: UpdateUserDto) {
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
    getTryByName(@Param("email") searchEmail: string) {
        return this.userService.getTryByEmail(searchEmail)
    }

    @Get("/id/:id")
    getOneById(@Param("id") userName: string) {
        return this.userService.getOneById(userName)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/addRole")
    addRole(@Body() dto: AddRoleUserDto) {
        return this.userService.addRole(dto)
    }

    @Get("/active/:email/:activationLink")
    @Redirect('https://ts-work.vercel.app/auth/login', 302)
    active(@Param("email") email: string, @Param("activationLink") activationLink: string) {
        return this.userService.active(email, activationLink)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/response")
    response(@Body() data: { email: string, id: string }) {
        return this.userService.response(data.email, data.id)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id)
    }
}