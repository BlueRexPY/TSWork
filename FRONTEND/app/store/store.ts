import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacancyReducer from "./reducers/vacanciesSlice";
import authReducer from "./reducers/authSlice";
import navReducer from "./reducers/navSlice";

const rootReducer = combineReducers({
  vacancyReducer,
  authReducer,
  navReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
