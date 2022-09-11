import { IAuthLogin } from "@/api/models/IAuthLogin";
import { IUser } from "@/api/models/IUser";
import { AuthResponse } from "@/api/models/response/AuthResponse";
import AuthService from "@/api/services/AuthService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState { 
    user:IUser;
    auth: boolean;
}

const initialState: AuthState ={
    user:{
        cv: "",
        email: "",
        name: "",
        surename: "",
        github: "",
        password: "",
        roles: ["USER"],
        vacancies: [],
        responses: [],
        active: false,
        activetionLink: "",
    },
    auth: false,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginAuth(state,action: PayloadAction<AuthResponse>){
            localStorage.setItem('token', action.payload.accessToken);
            state.user = action.payload.user
            state.auth = true
        },

        logoutAuth(state){
            localStorage.removeItem('token');
            state.auth = false
        }
    }
})

export default authSlice.reducer