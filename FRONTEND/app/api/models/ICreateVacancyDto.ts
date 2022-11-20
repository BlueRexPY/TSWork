export interface ICreateVacancyDto {
  author: string;
  companyName: string;
  companyAddress: string;
  companySize: string;
  companyType: string;
  experienceLevel: string;
  positionName: string;
  employmentType: string;
  minSalary: number;
  maxSalary: number;
  mainTechnology: string;
  techStack: string[];
  jobDescription: string;
  applyLink: string;
  workLocation: string;
}
