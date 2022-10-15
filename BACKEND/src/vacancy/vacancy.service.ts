
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { FileService, FileType } from '../file/file.service';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';

@Injectable()
export class VacancyService {
    constructor(@InjectModel(Vacancy.name)
    private vacancyModel: Model<VacancyDocument>,
        private fileService: FileService
    ) { }

    async create(dto: CreateVacancyDto, logo): Promise<Vacancy> {
        const logoPath = this.fileService.createFile(FileType.IMAGE, logo)
        const date = new Date();
        const vacancy = await this.vacancyModel.create({ ...dto, minSalary: Number(dto.minSalary), maxSalary: Number(dto.maxSalary), techStack: dto.techStack.split(","), logo: logoPath, responses: [], createdAt: date, view: 0 })
        return vacancy
    }

    async getOneById(id: string): Promise<Vacancy> {
        const vacancy = await this.vacancyModel.findById(id)
        if (vacancy) {
            await this.vacancyModel.findByIdAndUpdate(id, { view: (vacancy.view + 1) });
        }
        return vacancy
    }

    async response(data: { email: string, id: string }): Promise<boolean> {
        let vacancy = await this.vacancyModel.findById(data.id);
        if (![...vacancy.responses].includes(data.email)) {
            await this.vacancyModel.findByIdAndUpdate(data.id, { responses: [...vacancy.responses, data.email] });
            return true
        }
        return false
    }

    async delete(id: string): Promise<string> {
        const user = await this.vacancyModel.findByIdAndDelete(id)
        return user._id
    }

    async getVacancies(): Promise<Vacancy[]> {
        const vacancies = await this.vacancyModel.find()
        return vacancies
    }
}
