import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { Bind, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
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
    create(@UploadedFiles() files, @Body() dto: CreateVacancyDto) {
        return this.vacancyService.create(dto, files.logo[0])
    }

    @Get("/id/:id")
    getOneById(@Param("id") id: string) {
        return this.vacancyService.getOneById(id)
    }

    @Get()
    getVacancies() {
        return this.vacancyService.getVacancies()
    }

    @Post("/response/")
    response(@Body() data: { email: string, id: string }) {
        return this.vacancyService.response(data)
    }

    @Delete("/id/:id")
    delete(@Param("id") id: string) {
        return this.vacancyService.delete(id)
    }
}