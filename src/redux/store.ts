import { configureStore } from '@reduxjs/toolkit';
import customerSearchReducer from "./customer/CustomerSearchRedux";
import customerDetailReducer from "./customer/CustomerDetailRedux";
import globalReducer from "./common/global";
import recorderReducer from "./recorder";

const store = configureStore({ reducer: {
    global: globalReducer,
    customer: customerDetailReducer,
    customerSearch: customerSearchReducer,
    recorder: recorderReducer,    
}});
export type RootState = ReturnType<typeof store.getState> ;
export default store;
