import axios from "axios";
import { AuthResponse } from './models/response/AuthResponse';



export const API_URl = "http://localhost:5000"
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URl
})

$api.interceptors.request.use((config) => {
    config.headers = { Authorization: `Bearer ${localStorage.getItem('token')}`, }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    try {
        const response = await axios.get<AuthResponse>(`${API_URl}/users/refresh`, { withCredentials: true })
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
    } catch (e) {
        console.log(e)
    }

})

export default $api;