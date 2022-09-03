import { AuthService } from 'src/auth/auth.service';
import { Bind, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/auth')

export class AuthController {
    constructor(private authService: AuthService) { }
}