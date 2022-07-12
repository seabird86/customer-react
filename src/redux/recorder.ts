import { AnyAction } from "redux";
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "./store";

interface RecorderState{
    dateStart: string;
}

const initialState: RecorderState = {
    dateStart: ''
}

const userSlice = createSlice({
    name: 'recorder',
    initialState,
    reducers: {
        start:{
            reducer: (state:RecorderState, action:AnyAction) => {
                state.dateStart = action.payload.date;
            },
            prepare: (date: string) => {
                return {payload: {date}};
            }
        },
        stop: (state:RecorderState, action:AnyAction) => {
                state.dateStart = '';
        },
    },
});

export const selectDateStart = (rootState: RootState) => rootState.recorder.dateStart;

export const { start, stop } = userSlice.actions;
export default userSlice.reducer;