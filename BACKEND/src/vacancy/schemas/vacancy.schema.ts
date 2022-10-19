import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacancyDocument = Vacancy & Document;

@Schema()
export class Vacancy {

  @Prop()
  author: string;

  @Prop()
  logo: string;

  @Prop()
  companyName: string;

  @Prop()
  companyAddress: string;

  @Prop()
  companySize: string;

  @Prop()
  companyType: string;

  @Prop()
  experienceLevel: string;

  @Prop()
  positionName: string;

  @Prop()
  employmentType: string;

  @Prop()
  minSalary: number;

  @Prop()
  maxSalary: number;

  @Prop()
  mainTechnology: string;

  @Prop()
  techStack: string[];

  @Prop()
  jobDescription: string;

  @Prop()
  applyLink: string;

  @Prop()
  workLocation: string;

  @Prop()
  view: number;

  @Prop()
  responses: string[];

  @Prop()
  createdAt: number;
  
  @Prop()
  show: boolean;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);