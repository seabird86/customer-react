import { configureStore } from '@reduxjs/toolkit';
import customerReducer from "./customer";
import recorderReducer from "./recorder";

const store = configureStore({ reducer: {
    customer: customerReducer,
    recorder: recorderReducer,
}});
export type RootState = ReturnType<typeof store.getState> ;
export default store;
