import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  skill: string;
  lvl: string;
  active: boolean;
}

const initialState: NavState = {
  skill: "",
  lvl: "All",
  active: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<NavState>) {
      state.skill = action.payload.skill;
      state.lvl = action.payload.lvl;
      state.active = false;
    },
    setActive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
  },
});

export const { setSearch, setActive } = navSlice.actions;

export default navSlice.reducer;
