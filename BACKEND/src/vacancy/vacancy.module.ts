import { VacancyController } from './vacancy.controller';
import { FileService } from '../file/file.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancyService } from './vacancy.service';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }, { name: User.name, schema: UserSchema }]),
        AuthModule
    ],
    controllers: [VacancyController],
    providers: [VacancyService, FileService]
})

export class VacancyModule { } 