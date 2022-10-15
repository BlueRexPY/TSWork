import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  cv: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  number: string;

  @Prop()
  github: string;

  @Prop()
  password: string;

  @Prop()
  roles: string[];

  @Prop()
  vacancies: string[];

  @Prop()
  responses: string[];

  @Prop()
  active: boolean;

  @Prop()
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);