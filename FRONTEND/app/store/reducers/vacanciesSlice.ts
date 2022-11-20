import { IVacancy } from "@/api/models/IVacancy";
import { VacanciesService } from "@/api/services/VacanciesService";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VacanciesState {
  vacancies: IVacancy[];
  isLoading: boolean;
  error: string;
}

const initialState: VacanciesState = {
  vacancies: [],
  isLoading: true,
  error: "",
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setVacancies(state, action: PayloadAction<IVacancy[]>) {
      state.vacancies = action.payload;
    },
    fetchVacancies(state) {
      VacanciesService.getVacancies().then(
        (res) => (state.vacancies = res.data)
      );
    },
  },
});

export default vacanciesSlice.reducer;
