import { VacancyResponse } from "./../models/response/vacanciesResponse";
import { AxiosResponse } from "axios";
import $api from "..";
import { VacanciesResponse } from "../models/response/vacanciesResponse";
import { IVacancy } from "../models/IVacancy";
import { ICreateVacancyDto } from "../models/ICreateVacancyDto";

class VacanciesService {
  static async create(
    email: string,
    password: string
  ): Promise<AxiosResponse<VacanciesResponse>> {
    return $api.post<VacanciesResponse>("/users/login", { email, password });
  }

  static async getOneById(id: string): Promise<AxiosResponse<IVacancy>> {
    return $api.get<IVacancy>(`/vacancies/id/${id}`);
  }

  static async getVacancies(): Promise<AxiosResponse<IVacancy[]>> {
    return $api.get<IVacancy[]>(`/vacancies/`);
  }

  static async response(
    email: string,
    id: string
  ): Promise<AxiosResponse<boolean>> {
    return $api.post<boolean>("/vacancies/response/", { email, id });
  }
  static async responseUser(
    email: string,
    id: string
  ): Promise<AxiosResponse<boolean>> {
    return $api.post<boolean>("/users/response/", { email: email, id: id });
  }

  static async delete(id: string): Promise<AxiosResponse<string>> {
    return $api.delete<string>(`/vacancies/id/${id}`);
  }

  static async postVacancy(
    dto: ICreateVacancyDto,
    logo: { originFileObj: string }
  ): Promise<AxiosResponse<IVacancy>> {
    const formData = new FormData();
    formData.append("author", dto.author);
    formData.append("companyName", dto.companyName);
    formData.append("companyAddress", dto.companyAddress);
    formData.append("companySize", dto.companySize);
    formData.append("companyType", dto.companyType);
    formData.append("experienceLevel", dto.experienceLevel);
    formData.append("positionName", dto.positionName);
    formData.append("employmentType", dto.employmentType);
    formData.append("minSalary", String(dto.minSalary));
    formData.append("maxSalary", String(dto.maxSalary));
    formData.append("mainTechnology", dto.mainTechnology);
    formData.append("techStack", dto.techStack.join(","));
    formData.append("jobDescription", dto.jobDescription);
    formData.append("applyLink", dto.applyLink);
    formData.append("workLocation", dto.workLocation);
    formData.append("logo", logo.originFileObj);
    return $api.post<IVacancy>(`/vacancies/`, formData);
  }
}
export { VacanciesService };
