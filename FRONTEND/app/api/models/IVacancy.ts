export interface IVacancy {
  _id: string;
  logo: string;
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
  view: number;
  responses: string[];
  createdAt: number;
  show: true;
}
