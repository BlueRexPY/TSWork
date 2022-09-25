import { AxiosResponse } from 'axios';
import $api from '..';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/users/login', { email, password })
    }

    static async registration(
        name: string, 
        surename:string,
        email: string, 
        password:string,
        github:string,
        cv:{ originFileObj: string }
    ): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("surename", surename);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("github", github);
        formData.append("cv", cv.originFileObj);
        return $api.post<AuthResponse>('/users/', formData)
    }

    static async logout(): Promise<void> {
        return $api.post('/users/logout')
    }

}