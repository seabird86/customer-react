import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { Customer } from '../entity/CustomerEntity';

interface State {
    customer?: Customer;
}
const initState: State = {}

export const getCustomer = createAsyncThunk('customer/get',
    async (id) => {
        const response = await axios.get('http://localhost:3100/customers/${id}');
        return response.data;
    }
);

export default createReducer(initState, {
    [getCustomer.fulfilled.type]: (state: State, action: {payload: Customer}) => {
        state.customer = action.payload;
    },
});