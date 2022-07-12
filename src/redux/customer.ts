import { Action, AnyAction } from "redux";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from "./store";
import axios from 'axios';
import { faker } from '@faker-js/faker';

export interface Customer{
    id : number;
    title: string;
    dateStart: string;
    dateEnd:string;
}
interface CustomerState{
    byIds: Record<Customer['id'],Customer>;
    allIds: Customer['id'][];
    loading: boolean;
    error?: string;
}

interface LoadSuccessAction extends Action<string>{
    payload: {
        customers: Customer[];
    };
}

const initialState: CustomerState = {
    byIds:{},
    allIds:[],
    loading:false,
    error:undefined,
}

export const getCustomer = createAsyncThunk(
    'customer/get',
    async (id) => {
        const response = await axios.get('http://localhost:3001/customers');
        return {customers: response.data};
    }
);

export const getCustomers = createAsyncThunk(
    'customer/getAll',
    async () => {
        const response = await axios.get('http://localhost:3001/customers');
        return {customers: response.data};
    }
);

export const createCustomer = createAsyncThunk<any,any>(
    'customer/getAll',
    async (payload,{dispatch}) => { // getState, rejectWithValue(value, [meta]), fulfillWithValue(value, meta):
        await axios.post('http://localhost:3001/customers',{
            id: payload.id,
            title: faker.internet.userName(),
            dateStart: faker.date.past(),
            dateEnd: faker.date.past(),
        });
        dispatch(getCustomers());
    }
);

export const deleteCustomer = createAsyncThunk<any,any>(
    'customer/delete',
    async (id,{dispatch}) => {
        await axios.delete(`http://localhost:3001/customers/${id}`);
        dispatch(getCustomers());
    }
);



const userSlice = createSlice({
    name: 'customerPage',
    initialState,
    reducers: {
        getCustomerSync:{
            reducer: (state:CustomerState, action:AnyAction) => {
                state.byIds = action.payload.events;
            },
            prepare: (id:number) => {
                return { payload: { id: id } };
            },
        }
    },
    extraReducers: {        
        [getCustomer.pending.type]: (state:CustomerState, action:AnyAction) => {
            state.loading = true;
        },
        [getCustomer.fulfilled.type]: (state:CustomerState, action:LoadSuccessAction) => {
            const {payload} = action;
            const {customers} = payload;
            state.loading = false;
            state.allIds = customers.map(({id})=> id);
            state.byIds = customers.reduce<CustomerState['byIds']>((byIds, customer)=> {
                byIds[customer.id] = customer;
                return byIds;
            },{});
        },
        [getCustomer.rejected.type]: (state:CustomerState, action:AnyAction) => {
            state.loading = false;
            state.error = action.error;        
        },
        [getCustomers.pending.type]: (state:CustomerState, action:AnyAction) => {
            state.loading = true;
        },
        [getCustomers.fulfilled.type]: (state:CustomerState, action:LoadSuccessAction) => {
            const {payload} = action;
            const {customers} = payload;
            state.loading = false;
            state.allIds = customers.map(({id})=> id);
            state.byIds = customers.reduce<CustomerState['byIds']>((byIds, customer)=> {
                byIds[customer.id] = customer;
                return byIds;
            },{});
        },
        [getCustomers.rejected.type]: (state:CustomerState, action:AnyAction) => {
            state.loading = false;
            state.error = action.error;        
        },
    }
});

export const selectCustomerState = (rootState: RootState) => rootState.customer;
export const selectCustomers = (rootState: RootState) => {
    const state = selectCustomerState(rootState);
    return state.allIds.map(id=> state.byIds[id]);
}

export const { getCustomerSync } = userSlice.actions;
export default userSlice.reducer;