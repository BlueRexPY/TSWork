import { IVacancy } from "@/api/models/IVacancy";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VacancyState { 
    vacancies:IVacancy[];
    isLoading: boolean;
    error: string;
}

const initialState: VacancyState ={
    vacancies:[],
    isLoading: true,
    error: ""
}

export const vacancySlice = createSlice({
    name:'vacancy',
    initialState,
    reducers:{
        setVacancies(state,action: PayloadAction<IVacancy[]>){
            state.vacancies = action.payload
        }
    }
})

export default vacancySlice.reducer