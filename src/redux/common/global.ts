import { createReducer, Draft } from '@reduxjs/toolkit';
import { message } from 'antd';
import { AnyAction } from "redux";

export const pending = (state:Draft<any>, action:AnyAction) => {    
};

export const rejected = (state:Draft<any>, action:AnyAction) => {
};

export type LoadingState = Record<string, boolean>;
const initState: LoadingState = {};

export default createReducer(initState,{}, undefined,
    (state: LoadingState = {}, action: {type: any, error?:any}) => {
        const { type } = action;
        const matches = /(.*)\/(pending|fulfilled|rejected)/.exec(type);
        if (matches) {
            const [, routineType, status] = matches;
            state[routineType]= status === 'pending';
            if (status === 'rejected') {
                message.error(action?.error?.message);
            }
        }        
    }
);