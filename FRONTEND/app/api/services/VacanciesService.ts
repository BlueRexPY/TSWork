import { VacancyResponse } from './../models/response/vacanciesResponse';
import {AxiosResponse} from 'axios';
import $api from '..';
import { VacanciesResponse } from '../models/response/vacanciesResponse';
import { IVacancy } from '../models/IVacancy';

export default class VacaniesService {
    static async create(email: string, password: string): Promise<AxiosResponse<VacanciesResponse>> {
        return $api.post<VacanciesResponse>('/users/login', {email, password})
    }

    static async getOneById(id: string): Promise<AxiosResponse<VacancyResponse>> {
        return $api.get<VacancyResponse>(`/vacancies/id/${id}`)
    }

    static async getVacancies(): Promise<AxiosResponse<IVacancy[]>> {
        return $api.get<IVacancy[]>(`/vacancies/`)
    }

    static async response(email: string, id: string): Promise<AxiosResponse<boolean>> {
        return $api.post<boolean>('/vacancies/response/', {email, id})
    }

    static async delete(id:string): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/vacancies/id/${id}`)
    }

}