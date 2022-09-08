import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacancyReducer from './reducers/vacanciesSlice';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
    vacancyReducer,
    authReducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]