import { faker } from '@faker-js/faker';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { pending, rejected } from '../common/global';
import { CustomersRes } from '../entity/CustomerEntity';
import { DispatchParams } from '../entity/CommonEntity';

export interface State {
    loading: boolean;
    customersRes?: CustomersRes;
    error?: string;
}

const initState: State = {
    customersRes: undefined,
    loading: false,
    error: undefined,
}

export const getCustomers = createAsyncThunk<any, DispatchParams>('customer/getAll',
    async ({params}) => {
        const response = await axios.get(`http://localhost:3100/customers`,{params});
        return response.data;
    }
);

export const createCustomer = createAsyncThunk<any, any>('customer/create',
    async (payload, { dispatch }) => { // getState, rejectWithValue(value, [meta]), fulfillWithValue(value, meta):
        await axios.post('http://localhost:3100/customers', {
            id: payload.id,
            title: faker.internet.userName(),
            dateStart: faker.date.past(),
            dateEnd: faker.date.past(),
        });
        dispatch(getCustomers({}));
    }
);

export const deleteCustomer = createAsyncThunk<any, any>(
    'customer/delete',
    async (id, { dispatch }) => {
        await axios.delete(`http://localhost:3100/customers/${id}`);
        dispatch(getCustomers({}));
    }
);

export default createReducer(initState, {
    [getCustomers.pending.type]: pending,
    [getCustomers.rejected.type]: rejected,
    [getCustomers.fulfilled.type]: (state: State, action: { payload: CustomersRes }) => {
        state.loading = false;
        state.customersRes = action.payload;
    }
});