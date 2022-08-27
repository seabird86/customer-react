import { faker } from '@faker-js/faker';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { pending, rejected } from '../common/global';
import { CustomersRes } from '../entity/CustomerEntity';
import { DispatchParams } from '../entity/CommonEntity';

export interface State {
    customersRes?: CustomersRes;
}

const initState: State = {}

export const getCustomers = createAsyncThunk<any, DispatchParams>('customer/getAll',
    async ({params}) => {
        const response = await axios.get(`http://localhost:3100/customers`,{params});
        return response.data;
    }
);

export const createCustomer = createAsyncThunk<any, DispatchParams|undefined>('customer/create',
    async (payload) => { // , { dispatch } getState, rejectWithValue(value, [meta]), fulfillWithValue(value, meta):
        await axios.post('http://localhost:3100/customers', {
            firstName: faker.internet.userName(),
            dateStart: faker.date.past(),
            dateEnd: faker.date.past(),
        });
        if (payload) payload.callback();
    }
);

export const deleteCustomer = createAsyncThunk<any, DispatchParams>(
    'customer/delete',
    async ({id, callback}, { dispatch }) => {
        await axios.delete(`http://localhost:3100/customers/${id}`);
        if (callback) callback();
    }
);

export default createReducer(initState, {
    [getCustomers.pending.type]: pending,
    [getCustomers.rejected.type]: rejected,
    [getCustomers.fulfilled.type]: (state: State, action: { payload: CustomersRes }) => {
        state.customersRes = action.payload;
    }
});