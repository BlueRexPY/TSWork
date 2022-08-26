import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  cv: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  name: string;

  @Prop()
  surename: string;

  @Prop()
  github: string;

  @Prop()
  password: string;

  @Prop()
  roles: string[];

  @Prop()
  vacancies: ObjectId[];

  @Prop()
  responses: ObjectId[];

  @Prop()
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);