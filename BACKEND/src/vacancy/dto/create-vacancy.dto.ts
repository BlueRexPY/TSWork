export class CreateVacancyDto {
    readonly author: string;
    readonly companyName: string;
    readonly companyAddress: string;
    readonly companySize: string;
    readonly companyType: string;
    readonly experienceLevel: string;
    readonly postionName: string;
    readonly employmentType: string;
    readonly minSalary: number;
    readonly maxSalary: number;
    readonly mainTechnology: string;
    readonly techStack: string[];
    readonly jobDescription: string;
    readonly applyLink: string;
    readonly workLocation: string;
}