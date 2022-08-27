import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { VacancyService } from './vacancy.service';

@Controller('/vacancies')

export class VacancyController {
    constructor(private vacancyService: VacancyService) { }

    @Post()
    @Bind(UploadedFiles())
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 }
    ]))
    create(@UploadedFiles() files , @Body() dto: CreateVacancyDto){
        return this.vacancyService.create(dto, files.logo[0])
    } 

    @Get("/id/:id")
    getOneById(@Param("id") userName: ObjectId) {
        return this.vacancyService.getOneById(userName)
    }
    
    @Post("/response/")
    response(@Body() email: string, id:string) {
        return this.vacancyService.response(email,id)
    }

    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.vacancyService.delete(id)
    }
}