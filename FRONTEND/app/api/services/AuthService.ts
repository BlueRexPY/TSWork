import {AxiosResponse} from 'axios';
import $api from '..';
import { AuthResponse } from '../models/response/AuthResponse';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/users/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/users/', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/users/logout')
    }

}