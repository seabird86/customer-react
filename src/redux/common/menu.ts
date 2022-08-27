import { AnyAction } from "redux";
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MenuItem{
    id : number;
    title: string;
}
interface MenuState{
    menuItems: MenuItem[],
}

const initialState: MenuState = {
    menuItems: [],
}

export const getMenus = createAsyncThunk(
    'menus/get',
    async (id) => {
        const response = await axios.get('http://localhost:3100/menu-items');
        return {menuItems: response.data};
    }
);

const menuEventsReducer = createReducer(initialState, {
    [getMenus.fulfilled.type]: (state:MenuState, action:AnyAction) => {
    },
});
export default menuEventsReducer;