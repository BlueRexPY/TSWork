import { CreateUserDto } from './../user/dto/create-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Bind, Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Request } from 'express';
@Controller('/auth')

export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/login")
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @Post("/logout")
    @HttpCode(HttpStatus.OK)
    logout(@Body() dto: { refresh: string }) {
        return this.authService.logout(dto.refresh)
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cv', maxCount: 1 }
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateUserDto) {
        return this.authService.registration(dto, files.cv[0])
    }

    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    refresh(@Req() request: Request) {
        return this.authService.refresh(request.headers?.authorization);//request.cookies?.refreshToken
    }

}