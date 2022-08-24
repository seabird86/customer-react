import { AnyAction } from "redux";
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MenuItem{
    id : number;
    title: string;
    dateStart: string;
    dateEnd:string;
}
interface MenuState{
    menuItems: MenuItem[],
    loading: boolean;
    error?: string;
    
}

const initialState: MenuState = {
    menuItems: [],
    loading: false,
    error: undefined,
}

export const getMenus = createAsyncThunk(
    'menus/get',
    async (id) => {
        const response = await axios.get('http://localhost:3100/menu-items');
        return {menuItems: response.data};
    }
);

const menuEventsReducer = createReducer(initialState, {
    [getMenus.pending.type]: (state:MenuState, action:AnyAction) => {
    },
    [getMenus.fulfilled.type]: (state:MenuState, action:AnyAction) => {
        // change state
    },
    [getMenus.rejected.type]: (state:MenuState, action:AnyAction) => {
    },
});
export default menuEventsReducer;