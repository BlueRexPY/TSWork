/**
 * @jest-environment node
 */

import axios from 'axios';
import { AuthResponse } from '@/api/models/response/AuthResponse';
import { API_URl } from '@/api/index';

describe('Auth Service', () => {
        test('login', async () => {
                const response = await axios.post<AuthResponse>(API_URl + '/users/login', { email: "ruslanryscovbluerex@gmail.com", password: "password" })
                expect(response.data.user).toStrictEqual({
                        "_id": "631686e91779a88890fa0ffa",
                        "cv": "https://storage.cloud.google.com/tswork-files/13d82e5b-0991-49e0-94f6-5da0d4872331.pdf",
                        "email": "ruslanryscovbluerex@gmail.com",
                        "name": "name",
                        "surename": "surename",
                        "github": "https://github.com/BlueRexPY",
                        "password": "$2a$05$SDIJySEIrYnP2UfWNtLGFeynJt2nFUy.R6pXvP6Ypx7wGBte4OtuC",
                        "roles": [
                                "USER"
                        ],
                        "vacancies": [],
                        "responses": [],
                        "active": false,
                        "activetionLink": "a312cc6e-a207-45cc-af42-d31b6d671c48",
                        "__v": 0
                })
        })
        test('logout', async () => {
                const responseLogin = await axios.post<AuthResponse>(API_URl + '/users/login', { email: "ruslanryscovbluerex@gmail.com", password: "password" })

                const responseLogout = await axios.post<boolean>(API_URl + '/users/logout', { refresh: responseLogin.data.refreshToken })

                expect(responseLogout.data).toBe(true);
        })
});
