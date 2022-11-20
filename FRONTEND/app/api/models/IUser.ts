export interface IUser {
  cv: string;
  email: string;
  number: string;
  name: string;
  surname: string;
  github: string;
  password: string;
  roles: string[];
  vacancies: string[];
  responses: string[];
  active: boolean;
  activationLink: string;
}
