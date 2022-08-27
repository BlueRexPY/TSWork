import { VacancyController } from './vacancy.controller';
import { FileService } from '../file/file.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancyService } from './vacancy.service';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }])
    ],
    controllers: [VacancyController],
    providers: [VacancyService, FileService]
})

export class VacancyModule { } 