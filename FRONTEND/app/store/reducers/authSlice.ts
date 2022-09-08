
import { IUser } from "@/api/models/IUser";
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
    auth: true
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action: PayloadAction<IUser>){
            state.user = action.payload
            state.auth = true
        },

        setAuth(state,action: PayloadAction<boolean>){
            state.auth = action.payload
        }
    }
})

export default authSlice.reducer