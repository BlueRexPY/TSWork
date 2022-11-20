import { IVacancy } from "@/api/models/IVacancy";

export interface VacanciesResponse {
  vacancies: IVacancy[];
}

export interface VacancyResponse {
  vacancy: IVacancy;
}
