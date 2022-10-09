import { IAuthLogin } from "@/api/models/IAuthLogin";
import { IUser } from "@/api/models/IUser";
import { AuthResponse } from "@/api/models/response/AuthResponse";
import AuthService from "@/api/services/AuthService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: IUser;
    auth: boolean;
}

const initialState: AuthState = {
    user: {
        cv: "",
        number:"",
        email: "",
        name: "",
        surname: "",
        github: "",
        password: "",
        roles: ["USER"],
        vacancies: [],
        responses: [],
        active: false,
        activetionLink: ""
    },
    auth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth(state, action: PayloadAction<AuthResponse>) {
            //localStorage.setItem('token', action.payload.accessToken);
            state.user = action.payload.user
            state.auth = true
        },

        updateAuth(state, action: PayloadAction<IUser>) {
            state.user = action.payload
            state.auth = true
        },

        logoutAuth(state) {
            //localStorage.removeItem('token');
            state.auth = false
        }
    }
})

export const { loginAuth, updateAuth, logoutAuth } = authSlice.actions

export default authSlice.reducer