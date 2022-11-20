import { AxiosResponse } from "axios";
import $api from "..";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", {
      email: email,
      password: password,
    });
  }

  static async registration(
    name: string,
    surname: string,
    email: string,
    password: string,
    github: string,
    number: string,
    cv: { originFileObj: string }
  ): Promise<AxiosResponse<AuthResponse>> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("github", github);
    formData.append("number", number);
    formData.append("cv", cv.originFileObj);
    return $api.post<AuthResponse>("/auth", formData);
  }

  static async updateCV(
    name: string,
    surname: string,
    email: string,
    github: string,
    number: string,
    cv: { originFileObj: string }
  ): Promise<AxiosResponse<IUser>> {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("github", github);
    formData.append("number", number);
    formData.append("cv", cv.originFileObj);
    return $api.post<IUser>("/users/updateCV", formData);
  }
  static async update(
    name: string,
    surname: string,
    email: string,
    github: string,
    number: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>("/users/update", {
      name: name,
      surname: surname,
      email: email,
      github: github,
      number: number,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/auth/logout");
  }

  static async getByEmail(email: string): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/${email}`);
  }

  static async addRole(
    email: string,
    role: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.post("/users/addRole", { email: email, role: role });
  }
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post(`/auth/refresh`);
  }
}
