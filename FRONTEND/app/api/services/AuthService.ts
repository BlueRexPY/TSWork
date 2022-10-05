import { AxiosResponse } from 'axios';
import $api from '..';
import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/users/login', { email: email, password: password })
    }

    static async registration(
        name: string,
        surename: string,
        email: string,
        password: string,
        github: string,
        number: string,
        cv: { originFileObj: string }
    ): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surename", surename);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("github", github);
        formData.append("number", number);
        formData.append("cv", cv.originFileObj);
        return $api.post<AuthResponse>('/users/', formData)
    }

    static async updateCV(
        name: string,
        surename: string,
        email: string,
        github: string,
        number: string,
        cv: { originFileObj: string }
    ): Promise<AxiosResponse<IUser>> {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surename", surename);
        formData.append("email", email);
        formData.append("github", github);
        formData.append("number", number);
        formData.append("cv", cv.originFileObj);
        return $api.post<IUser>('/users/updateCV', formData)
    }
    static async update(
        name: string,
        surename: string,
        email: string,
        github: string,
        number: string,
    ): Promise<AxiosResponse<IUser>> {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surename", surename);
        formData.append("email", email);
        formData.append("github", github);
        formData.append("number", number);
        return $api.post<IUser>('/users/update', formData)
    }


    static async logout(): Promise<void> {
        return $api.post('/users/logout')
    }

}