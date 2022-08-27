import { TablePaginationConfig } from "antd/es/table";

export interface DispatchParams {
    params?:{
        [key: string]: any;
        page?:number;
        pageSize?:number;
        filters?: any;
        sorter?: any;
    };
    body?:any;
    callback?: any;
    [key: string]: any;
    
}

export interface Pagination extends TablePaginationConfig {
}