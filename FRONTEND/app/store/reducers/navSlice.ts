import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
    skill: string;
    lvl: string;
}

const initialState: NavState = {
    skill: "",
    lvl: "All"
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setSerch(state, action: PayloadAction<NavState>) {
            state.skill = action.payload.skill
            state.lvl = action.payload.lvl
        }
    }
})

export default navSlice.reducer